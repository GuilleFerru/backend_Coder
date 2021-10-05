import express, { Request, Response } from "express";
import { Producto } from "./interfaces/IProducto";
import { app, io, isAdmin } from "./server"
import { saveProductsToDB, loadProductsFromDB, loadProductByIdFromDB, deleteProductByIdFromDB, updateProductByIdFromDB } from "./productosDB";
import { dao } from "./main";

export const productoAPI = () => {

    const routerProducts = express.Router();
    app.use("/productos", routerProducts);

    const checkIdProduct = async (req: Request, res: Response, next: () => void) => {
        const id: string = (req.params.id);
        const productoById: Producto | undefined = await dao.getProductoById(id);
        
        if (productoById) {
            if (productoById._id === id) {
                res.status(200).json(productoById);
            } else {
                res.status(404).json({ error: "este producto no esta cargado" });
            }
        } else {
            next();
        }
    };

    routerProducts.get("/listar/:id?", checkIdProduct, async (_: Request, res: Response) => {
        const products = await dao.getProductos();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "no hay productos cargados" });
        }
    }
    );

    routerProducts.post("/agregar", async (req: Request, res: Response) => {
        if (isAdmin) {
            const newProducto: Producto = new Producto(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            await dao.insertProducto(newProducto)
            io.sockets.emit("products", await dao.getProductos());
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
            const newProducto: Producto = new Producto(
                req.body.title,
                req.body.description,
                req.body.code,
                req.body.thumbnail,
                req.body.price,
                req.body.stock
            );
            if (newProducto) {
                res.status(200).json(await dao.updateProducto(id,newProducto));
                io.sockets.emit("products", await dao.getProductos());
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
            const productToBeDelete: Producto | undefined = await dao.getProductoById(id);
            if (productToBeDelete) {
                res.status(200).json( await dao.deleteProducto(productToBeDelete._id));
                io.sockets.emit("products", await dao.getProductos());
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
