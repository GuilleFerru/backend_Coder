import { Producto } from "./IProducto";

interface ICart {
    _id: string;
    timestamp: number;
    quantity: number;
    producto?: Producto;
}

export class Cart implements ICart {
    [x: string]: any;
    public _id: string | any = '';
    public timestamp: number | any = Date.now();
    public quantity: number | any;
    public producto: Producto | any;

    constructor(quantity: number, producto: Producto) {
        this.producto = producto;
        this.quantity = quantity;
    }
}