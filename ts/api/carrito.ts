import { dao,io, newSession } from "../server";
import { Cart } from "../model/DAOs/interfaces/ICart";
import * as twilioWsp from '../twilio/wsp.js';
import * as twilioSms from '../twilio/sms.js';
import * as ethereal from "../email/nodemailerEthereal";
import { loggerError } from "../utils/loggers";
import { Producto } from "../model/DAOs/interfaces/IProducto";
const ApiProductos = require("../api/productos");
const apiProductos = new ApiProductos();
const config = require("../../config.js")

class ApiCarrito {

    getCarrito = async (id: string) => {
        const carritoById: Cart | undefined = await dao.getCarritoById(id);

        if (carritoById) {
            if (String(carritoById._id) === id) {
                return carritoById;
            } else {
                return false;
            }
        } else {
            const carrito = await dao.getCarrito();
            if (carrito.length > 0) {

                return carrito;
            } else {
                return '';
            }
        }
    };

    // Esta funcion es la que se encarga de guardar el carrito creado por el usuario, creando la orden de venta, desde el dao se devuelve un array con la
    // orden creada tanto para el cliente como para el vendedor, luego se vacia el carrito y se envia un mensaje de confirmacion al cliente y al vendedor.
    postCarrito = async (orderToProcess: Cart[] | any) => {
        const orderProcessed: any = await dao.insertOrder(orderToProcess);
        const orderProcessedId = orderProcessed[0]._id;
        const orderProcessedDate = orderProcessed[0].fyh;
        const orderProcessedTotal = orderProcessed[0].orderTotal;
        const orderProcessedAdmin = orderProcessed[0].adminOrder;
        const orderProcessedClient = orderProcessed[0].clientOrder;

        const nombreAndEmail = `${newSession.getNombre()} - ${newSession.getEmail()}`
        const mensajeWsp = `---- ${orderProcessedDate} Nuevo pedido de: ${nombreAndEmail}  ---- Número de Orden: ${orderProcessedId}  --- Pedido: ${JSON.stringify(orderProcessedAdmin, null, '\t')}  ----  Precio Total $: ${orderProcessedTotal}  ---`;
        const mensajeSms = `---- ${orderProcessedDate} Número de Orden: ${orderProcessedId} ---- Orden solicitada: ${JSON.stringify(orderProcessedClient, null, '\t')} ----  Precio Total $: ${orderProcessedTotal}  ---`;
        const mensajeMail = `---- ${orderProcessedDate} Número de Orden: ${orderProcessedId} ---- Orden solicitada: <br> ${JSON.stringify(orderProcessedAdmin, null, '<br>')} <br> ----  Precio Total $: ${orderProcessedTotal}  ---`;

        try {
            const phone: string = newSession.getIsAdmin() ? newSession.getPhone() : config.TWILIO_PHONE;
            
            await twilioWsp.enviarWsp(mensajeWsp, phone);
            await twilioSms.enviarSMS(mensajeSms, newSession.getPhone());
            ethereal.enviarMail(`Nuevo pedido de: ${nombreAndEmail}`, mensajeMail, (err: any, _info: any) => {
                if (err) loggerError.error(err)
            })
        }
        catch (error) {
            loggerError.error('ERROR enviarWapp', error)
        }
        return orderProcessedId;

    };

// Borra un producto del carrito y restablece el stock del producto
    deleteCarrito = async (id: string) => {
        const cartToBeDelete = await dao.getCarritoById(id);

        if (cartToBeDelete) {

            await dao.deleteCarrito(cartToBeDelete._id);
            await apiProductos.restoreStock(cartToBeDelete.producto, cartToBeDelete.quantity);
            io.sockets.emit("carts", await dao.getCarrito());
            return true;
        } else {
            return false;
        }
    };

    //Esta funcion guarda un producto en el carrito, si el producto existe y tiene stock busca un carrito creado y abierto en la db, si lo encuentra
    // se fija de que no exista un producto similar al que se quiere agregar, si es el mismo producto actualiza el stock y luego agrega el producto en el carrito.
    //Si el producto a agregar no coincide con los guardados lo agrega al carrito.
    postProductoInCarrito = async (id: string) => {
        const productoById: Producto | undefined = await dao.getProductoById(id);

        if (productoById) {
            const stock = productoById.stock;

            if (stock > 0) {
                const carrrito = await dao.getCarrito();

                if (carrrito.length > 0) {
                    const cartToBeUpdate = await carrrito.find((cart: any) => String(cart.producto?._id) === id);

                    if (cartToBeUpdate) {
                        const producto = await apiProductos.updateStock(productoById);
                        const carritoWithProductoStockUpdated: Cart = {
                            ...cartToBeUpdate,
                            producto: producto,
                        }
                        await dao.updateQtyInCarrito(carritoWithProductoStockUpdated);

                    } else {
                        const producto = await apiProductos.updateStock(productoById);
                        await dao.insertProductToCarrito(producto);

                    }
                } else {
                    const producto = await apiProductos.updateStock(productoById);
                    await dao.insertProductToCarrito(producto);

                }
                return true;

            }
        } else {
            return false;
        }
    };
}


module.exports = ApiCarrito;