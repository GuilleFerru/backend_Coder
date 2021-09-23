import express, { Request, Response } from "express";
import { Product } from "./Product";
import { app, productLogic, io, isAdmin } from "./server"



export const productApi = () => {

    const routerProducts = express.Router();
    app.use("/productos", routerProducts);


    const checkIdProduct = (req: Request, res: Response, next: () => void) => {
        const id: number = parseInt(req.params.id, 10);
        const productById = productLogic.getProductsById(id);
        if (id) {
            if (productById?.id === id) {
                res.status(200).json(productById);
            } else {
                res.status(404).json({ error: "este producto no esta cargado" });
            }
        } else {
            next();
        }
    };

    routerProducts.get("/listar/:id?", checkIdProduct, (_: Request, res: Response) => {
        const products = productLogic.getProducts();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "no hay productos cargados" });
        }
    }
    );

    routerProducts.post("/agregar", (req: Request, res: Response) => {
        if (isAdmin) {
            const newProduct: Product = new Product(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            productLogic.addProducts(newProduct);
            io.sockets.emit("products", productLogic.getProducts());
            res.status(200).json({ server: "Producto creado" });
        } else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/agregar metodo POST no autorizado",
            });
        }
    });

    routerProducts.put("/actualizar/:id", (req: Request, res: Response) => {
        if (isAdmin) {
            const id: number = parseInt(req.params.id, 10);
            const newProduct: Product = new Product(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            if (newProduct) {
                res.status(200).json(productLogic.updateProduct(newProduct, id));
                io.sockets.emit("products", productLogic.getProducts());
            } else {
                res.status(404).json({ error: "producto no encontrado" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/actualizar/${req.params.id} metodo PUT no autorizado`,
            });
        }
    });

    routerProducts.delete("/borrar/:id", (req: Request, res: Response) => {
        if (isAdmin) {
            const id: number = parseInt(req.params.id, 10);
            const productToBeDelete = productLogic.getProductsById(id);
            if (productToBeDelete) {
                res.status(200).json(productLogic.deleteProduct(productToBeDelete));
                io.sockets.emit("products", productLogic.getProducts());
            } else {
                res
                    .status(404)
                    .json({ error: "producto no existente, no se puede borrar" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
            });
        }
    });
}
