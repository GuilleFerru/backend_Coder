import { Request, Response } from "express";
import { Cart } from "../model/DAOs/interfaces/ICart";


const ApiCarrito = require("../api/carrito");

class ControladorCarrito {

    private apiCarrito: typeof ApiCarrito;
    constructor() {
        this.apiCarrito = new ApiCarrito();
    }

    getCarrito = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const resultado = await this.apiCarrito.getCarrito(id);
        if (!resultado) {
            res.status(200).json({ msg: "Carro vacio" });
        } else {
            return res.status(200).json(resultado);
        }
    };

    postCarrito = async (req: Request, res: Response) => {
        const orderToProcess: Cart[] = req.body;
        const resultado = await this.apiCarrito.postCarrito(orderToProcess);

        if (!resultado) {
            res.status(404).json({ error: "Hubo un problema con esta venta" });
        } else {
            return res.status(201).json({ resultado });
        }
    };

    deleteCarrito = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const resultado = await this.apiCarrito.deleteCarrito(id);
        if (!resultado) {
            res.status(404).json({ error: "No se pudo eliminar carrito" });
        } else {
            return res.status(200).json(resultado);
        }
    };

    postProductoInCarrito = async (req: Request, res: Response) => {
        const id: string = req.params.id_producto;
        const resultado = await this.apiCarrito.postProductoInCarrito(id);
        if (!resultado) {
            res.status(404).json({ error: "No se pudo agregar este producto" });
        } else {
            return res.status(200).json(resultado);
        }
    };
}



module.exports = ControladorCarrito;