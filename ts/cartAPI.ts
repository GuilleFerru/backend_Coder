import express, { Request, Response } from "express";
import { app, io, cartLogic } from "./server";
import { loadProductByIdFromDB } from "./productosDB";

export const cartApi = () => {

    const carritoProducts = express.Router();
    app.use("/carrito", carritoProducts);

    carritoProducts.post("/agregar/:id_producto", async (req: Request, res: Response) => {
        const id: string = req.params.id_producto;        
        const productById = await loadProductByIdFromDB(id);
        if (productById) {
            const carts = cartLogic.getCart();
            if (carts.length > 0) {
                const cartToBeUpdate = carts.find((cart) => cart.product?.id === id);
                if (cartToBeUpdate) {
                    cartLogic.updateQtyInCart(cartToBeUpdate);
                } else {
                    cartLogic.addProductToCart(productById);
                }
            } else {
                cartLogic.addProductToCart(productById);
            }
            res.status(200).json({ server: "Producto agregado al carrito" });
        } else {
            res.status(404).json({ error: "producto no encontrado" });
        }
    });

    const checkIdProductInCarrito = (req: Request, res: Response, next: () => void) => {
        const id: number = parseInt(req.params.id, 10);
        const cart = cartLogic.getCartById(id);
        if (id) {
            if (cart?.id === id) {
                res.status(200).json(cart.product);
            } else {
                res
                    .status(404)
                    .json({ error: "este producto no esta cargado en el carrito" });
            }
        } else {
            next();
        }
    };

    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, (_: Request, res: Response) => {
        const carritos = cartLogic.getCart();
        res.status(200).json(carritos);
    }
    );

    carritoProducts.delete("/borrar/:id", (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const cartToBeDelete = cartLogic.getCartById(id);
        if (cartToBeDelete) {
            res.status(200).json(cartLogic.deleteCart(cartToBeDelete));
            io.sockets.emit("carts", cartLogic.getCart());
        } else {
            res.status(404).json({ error: "carrito no existente, no se puede borrar" });
        }
    });

}