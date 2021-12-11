import { io, newSession } from "../app";
import { Cart } from "../interfaces/ICart";
import * as twilioWsp from '../twilio/wsp.js';
import * as twilioSms from '../twilio/sms.js';
import * as ethereal from "../email/nodemailerEthereal";
import { loggerError } from "../loggers";

const dalCarrito = require("../persistencia/dalCarrito");
const dalProductos = require("../persistencia/dalProductos");


module.exports = {

    getCarrito: async (id: string) => {
        const carritoById: Cart | undefined = await dalCarrito.getCarritoById(id);
        
        
        if (carritoById) {
            if (String(carritoById._id) === id) {
                return carritoById;
            } else {
                return false;
            }
        } else {
            const carrito = await dalCarrito.getCarrito(); 
            if (carrito.length > 0) {
                return carrito;
            } else {
                return '';
            }
        }
    },

    postCarrito: async (orderToProcess: Cart) => {
        const orderProcessed: any = await dalCarrito.insertOrder(orderToProcess);
        const orderProcessedId = orderProcessed[0]._id;
        const orderProcessedTotal = orderProcessed[0].orderTotal;
        const orderProcessedProductos = orderProcessed[0].productos;
        const orderProcessedAdmin: { cantidad: number; producto: string; precioPorUnidad: number; codigo: string; precioTotal: number }[] = [];
        const orderProcessedUser: { producto: string; cantidad: number; precioPorUnidad: number; precioTotal: number }[] = [];

        orderProcessedProductos.map((order: any) => {
            const producto = order.producto.title;
            const codigo = order.producto.code;
            const cantidad = order.quantity;
            const precioPorUnidad = order.producto.price;
            const precioTotal = order.total;

            orderProcessedAdmin.push({
                producto,
                codigo,
                cantidad,
                precioPorUnidad,
                precioTotal
            });

            orderProcessedUser.push({
                producto,
                cantidad,
                precioPorUnidad,
                precioTotal
            });

        });
        const nombreAndEmail = `${newSession.getNombre()} - ${newSession.getEmail()}`
        const mensajeWsp = `----  Nuevo pedido de: ${nombreAndEmail}  ---- Número de Orden: ${orderProcessedId}  --- Pedido: ${JSON.stringify(orderProcessedAdmin, null, '\t')}  ----  Precio Total $: ${orderProcessedTotal}  ---`;
        const mensajeSms = `---- Número de Orden: ${orderProcessedId} ---- Orden solicitada: ${JSON.stringify(orderProcessedUser, null, '\t')} ----  Precio Total $: ${orderProcessedTotal}  ---`;
        const mensajeMail = `---- Número de Orden: ${orderProcessedId} ---- Orden solicitada: <br> ${JSON.stringify(orderProcessedAdmin, null, '<br>')} <br> ----  Precio Total $: ${orderProcessedTotal}  ---`;

        try {
            // console.log(req.session);
            await twilioWsp.enviarWsp(mensajeWsp);
            await twilioSms.enviarSMS(mensajeSms, newSession.getPhone());
            ethereal.enviarMail(`Nuevo pedido de: ${nombreAndEmail}`, mensajeMail, (err: any, _info: any) => {
                if (err) loggerError.error(err)
            })
        }
        catch (error) {
            loggerError.error('ERROR enviarWapp', error)
        }
        return orderProcessedId;

    },

    deleteCarrito: async (id: string) => {
        const cartToBeDelete = await dalCarrito.getCarritoById(id);
        if (cartToBeDelete) {
            await dalCarrito.deleteCarrito(cartToBeDelete._id);
            io.sockets.emit("carts", await dalCarrito.getCarrito());
            return true;
        } else {
            return false;
        }
    },

    postProductoInCarrito: async (id: string) => {
        const productoById: Cart | undefined = await dalProductos.getProductoById(id);

        if (productoById) {
            const carrrito = await dalCarrito.getCarrito();
            if (carrrito.length > 0) {
                const cartToBeUpdate = carrrito.find((cart:any) => String(cart.producto?._id) === id);
                if (cartToBeUpdate) {
                    await dalCarrito.updateQtyInCarrito(cartToBeUpdate);
                } else {
                    await dalCarrito.insertProductToCarrito(productoById);
                }
            } else {
                await dalCarrito.insertProductToCarrito(productoById);
            }
            return true;
        } else {
            return false;
        }
    }

}