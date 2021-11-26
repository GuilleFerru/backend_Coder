import express, { Request, Response } from "express";
import { io } from "./main"
import { app } from "./server"
import { Producto } from "./interfaces/IProducto";
import { newSession } from "./loginUserAPI";
import { Cart } from "./interfaces/ICart";
import { dao } from "./main";
import * as twilioWsp from './twilio/wsp.js';
import * as twilioSms from './twilio/sms.js';
import * as ethereal from "./email/nodemailerEthereal";

import { loggerError, loggerInfo, loggerWarn } from "./loggers";


export const carritoAPI = () => {

    const carritoProducts = express.Router();
    app.use("/carrito", carritoProducts);

    carritoProducts.post("/agregar/:id_producto", async (req: Request, res: Response) => {
        const id: string = req.params.id_producto;
        const productoById: Producto | undefined = await dao.getProductoById(id);
        if (productoById) {
            const carrrito = await dao.getCarrito();
            if (carrrito.length > 0) {
                const cartToBeUpdate = carrrito.find((cart) => String(cart.producto?._id) === id);
                if (cartToBeUpdate) {
                    await dao.updateQtyInCarrito(cartToBeUpdate);
                } else {
                    await dao.insertProductToCarrito(productoById);
                }
            } else {
                await dao.insertProductToCarrito(productoById);
            }
            res.status(200).json({ server: "Producto agregado al carrito" });
        } else {
            res.status(404).json({ error: "producto no encontrado" });
        }


    });

    const checkIdProductInCarrito = async (req: Request, res: Response, next: () => void) => {
        const id: string = req.params.id;
        const carrito = await dao.getCarritoById(id);
        if (carrito) {
            if (carrito?._id === id) {
                res.status(200).json(carrito.producto);
            } else {
                res.status(404).json({ error: "este producto no esta cargado en el carrito" });
            }
        } else {
            next();
        }
    };

    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, async (_: Request, res: Response) => {
        const carritos = await dao.getCarrito();
        res.status(200).json(carritos);
    }
    );

    carritoProducts.post("/agregar", async (req: Request, res: Response) => {
        const orderToProcess: Array<Cart> = req.body;
        const orderProcessed: any = await dao.insertOrder(orderToProcess);
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
            ethereal.enviarMail(`Nuevo pedido de: ${nombreAndEmail}`, mensajeMail, (err: any, info: any) => {
                if (err) loggerError.error(err)
            })
        }
        catch (error) {
            loggerError.error('ERROR enviarWapp', error)
        }
        res.status(200).json({ orderProcessedId });
    });

    carritoProducts.delete("/borrar/:id", async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const cartToBeDelete = await dao.getCarritoById(id);
        if (cartToBeDelete) {
            res.status(200).json(await dao.deleteCarrito(cartToBeDelete._id));
            io.sockets.emit("carts", await dao.getCarrito());
        } else {
            res.status(404).json({ error: "carrito no existente, no se puede borrar" });
        }
    });

}