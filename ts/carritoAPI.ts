import express, { Request, Response } from "express";
import { app, io, cartLogic } from "./server";
import { loadProductByIdFromDB } from "./productosDB";
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { dao } from "./main";
import { Order } from "./interfaces/IOrder";

export const carritoAPI = () => {

    const carritoProducts = express.Router();
    app.use("/carrito", carritoProducts);

    carritoProducts.post("/agregar/:id_producto", async (req: Request, res: Response) => {
        const id: string = req.params.id_producto;
        const productoById: Producto | undefined = await dao.getProductoById(id);
        if (productoById) {
            const carrrito = dao.getCarrito();
            if (carrrito.length > 0) {
                const cartToBeUpdate = carrrito.find((cart) => cart.producto?._id === id);
                if (cartToBeUpdate) {
                    dao.updateQtyInCarrito(cartToBeUpdate);
                } else {
                    dao.insertProductToCarrito(productoById);
                }
            } else {
                dao.insertProductToCarrito(productoById);
            }
            res.status(200).json({ server: "Producto agregado al carrito" });
        } else {
            res.status(404).json({ error: "producto no encontrado" });
        }
        
        
    });

    const checkIdProductInCarrito = (req: Request, res: Response, next: () => void) => {
        const id: string = req.params.id;
        const carrito = dao.getCarritoById(id);
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

    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, (_: Request, res: Response) => {
        const carritos = dao.getCarrito();
        res.status(200).json(carritos);
    }
    );

    carritoProducts.post("/agregar", async (req: Request, res: Response) => {
        const order: Array<Cart> = req.body; 
        await dao.insertOrder(order)
        // io.sockets.emit("products", await dao.getProductos());
        res.status(200).json({ server: "Compra finalizada" });

    });

    carritoProducts.delete("/borrar/:id", (req: Request, res: Response) => {
        const id: string = req.params.id;
        const cartToBeDelete = dao.getCarritoById(id);
        if (cartToBeDelete) {
            res.status(200).json(dao.deleteCarrito(cartToBeDelete._id));
            io.sockets.emit("carts", dao.getCarrito());
        } else {
            res.status(404).json({ error: "carrito no existente, no se puede borrar" });
        }
    });

}