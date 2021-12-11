import { Request, Response } from "express";
import { newSession, io } from '../app';


const negocioProductos = require("../negocio/negocioProductos");

module.exports = {
    getVistaTest: async (req: Request, res: Response) => {
        const cant = Number(req.query.cant);
        const resultado = await negocioProductos.getVistaTest(cant);
        if (!resultado) {
            res.status(404).json({ error: "este producto no esta cargado" });
        } else {
            return res.status(200).json(resultado);
        }
    },

    getProductos: async (req: Request, res: Response) => {
        const id: string = (req.params.id);
        const resultado = await negocioProductos.getProductos(id);
        if (!resultado) {
            res.status(404).json({ error: "este producto no esta cargado" });
        } else {
            return res.status(200).json(resultado);
        }
    },

    postProducto: async (req: Request, res: Response) => {
        if (newSession.getIsAdmin()) {
            const producto = req.body;
            const resultado = await negocioProductos.postProducto(producto);
            if (!resultado) {
                res.status(404).json({ error: "este producto no se pudo guardar" });
            } else {
                console.log("producto guardado");
                io.sockets.emit("products", await negocioProductos.getProductos());
                res.status(200).json({ server: "Producto creado" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/agregar metodo POST no autorizado",
            });
        }
    },
    
    putProducto: async (req: Request, res: Response) => {
        if (newSession.getIsAdmin()) {
            const id: string = (req.params.id);
            const producto = req.body;
            const resultado = await negocioProductos.putProducto(id, producto);
            if (!resultado) {
                res.status(404).json({ error: "producto no encontrado" });
            } else {
                res.status(200).json(resultado);
                io.sockets.emit("products", await negocioProductos.getProductos());
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/actualizar/${req.params.id} metodo PUT no autorizado`,
            });
        }
    },

    deleteProducto: async (req: Request, res: Response) => {
        if (newSession.getIsAdmin()) {
            const id: string = req.params.id;
            const resultado = await negocioProductos.deleteProducto(id);
            if (!resultado) {
                res.status(404).json({ error: "producto no existente, no se puede borrar" });
            } else {
                io.sockets.emit("products", await negocioProductos.getProductos());
                res.status(200).json({ server: "Producto creado" });
            }
        } else {
            res.status(403).json({
                error: -1,
                descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
            });
        }
    }

}
