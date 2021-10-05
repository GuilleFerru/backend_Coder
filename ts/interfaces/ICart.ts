import { Producto } from "./IProducto";

interface ICart {
    _id: string;
    timestamp: number;
    quantity: number;
    producto?: Producto;
}

export class Cart implements ICart {
    public _id: string = '';
    public timestamp: number = 0;
    public quantity: number;
    public producto: Producto;

    constructor(quantity: number, producto: Producto) {
        this.producto = producto;
        this.quantity = quantity;
    }
}