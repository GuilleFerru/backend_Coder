import express, { Request, Response } from "express";
import { Product } from "./Product";
import { app, io, isAdmin } from "./server"
import { saveProductsToDB, loadProductsFromDB, loadProductByIdFromDB, deleteProductByIdFromDB, updateProductByIdFromDB } from "./productosDB";

export const productApi = () => {

    const routerProducts = express.Router();
    app.use("/productos", routerProducts);

    const checkIdProduct = async (req: Request, res: Response, next: () => void) => {
        const id: string = (req.params.id);
        const productById: Product = await loadProductByIdFromDB(id);
        if (id) {
            if (productById.id === id) {
                res.status(200).json(productById);
            } else {
                res.status(404).json({ error: "este producto no esta cargado" });
            }
        } else {
            next();
        }
    };

    routerProducts.get("/listar/:id?", checkIdProduct, async (_: Request, res: Response) => {
        const products = await loadProductsFromDB();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "no hay productos cargados" });
        }
    }
    );

    routerProducts.post("/agregar", async (req: Request, res: Response) => {
        if (isAdmin) {
            const newProduct: Product = new Product(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            await saveProductsToDB(newProduct)
            io.sockets.emit("products", await loadProductsFromDB());
            res.status(200).json({ server: "Producto creado" });
        } else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/agregar metodo POST no autorizado",
            });
        }
    });

    routerProducts.put("/actualizar/:id",async (req: Request, res: Response) => {
        if (isAdmin) {
            const id: string = (req.params.id);
            const newProduct: Product = new Product(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            if (newProduct) {
                res.status(200).json(await updateProductByIdFromDB(id,newProduct));
                io.sockets.emit("products", await loadProductsFromDB());
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

    routerProducts.delete("/borrar/:id", async (req: Request, res: Response) => {
        if (isAdmin) {
            const id: string = req.params.id;
            const productToBeDelete: Product = await loadProductByIdFromDB(id);
            if (productToBeDelete) {
                res.status(200).json( await deleteProductByIdFromDB(productToBeDelete.id));
                io.sockets.emit("products", await loadProductsFromDB());
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
