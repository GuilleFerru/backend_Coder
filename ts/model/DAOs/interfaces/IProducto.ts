export interface IProducto {
    _id: string;
    timestamp: number;
    title: string;
    description: string;
    code: string;
    thumbnail: string;
    price: number;
    stock: number;
}


export class Producto implements IProducto {
    public _id: string = '';
    public timestamp: number = Date.now();
    public title: string;
    public description: string;
    public code: string;
    public thumbnail: string;
    public price: number;
    public stock: number;

    constructor(
        title: string,
        description: string,
        code: string,
        thumbnail: string,
        price: number,
        stock: number
    ) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
    }
}