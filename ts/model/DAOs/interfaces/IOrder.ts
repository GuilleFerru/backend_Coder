import { Cart } from "./ICart";

interface IOrder {
    _id: string;
    timestamp: number;
    carrito?: Array<Cart>;
}

export class Order implements IOrder {
    public _id: string = '';
    public timestamp: number;
    public carrito: Array<Cart>;

    constructor(id: string, timestamp: number, carrito: Array<Cart>) {
        this._id = id;
        this.timestamp = timestamp;
        this.carrito = carrito;
    }
}