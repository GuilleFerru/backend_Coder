import * as fs from "fs";
import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { Order } from "../interfaces/IOrder";
import { Mensaje } from "../interfaces/IMensaje";

export class FileSystemDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    mensajes: Array<Mensaje>
    countCarrito: number;
    countOrder: number;


    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();

        this.countCarrito = 1;
        this.countOrder = 1;
    }

    private pathProducto: string = "./fileSystemDB/productos.txt";
    private pathCarrito: string = "./fileSystemDB/carrito.txt";
    private pathOrder: string = "./fileSystemDB/order.txt";
    private pathMensajes: string = "./fileSystemDB/mensajes.txt";

    private getNewId(): string {
        const maxId: number = Math.max(...this.productos.map(prd => Number(prd._id)), 0);
        const newId: number = maxId + 1;
        return String(newId);
    }

    insertProducto(producto: Producto): void {
        producto._id = this.getNewId();
        this.productos.push(producto)
        try {
            const productosFromTxt = fs.readFileSync(this.pathProducto, 'utf-8');
            const jsonProductosFromTxt = JSON.parse(productosFromTxt);
            const productosNew = [...jsonProductosFromTxt, producto];
            fs.writeFileSync(this.pathProducto, JSON.stringify(productosNew, null, "\t"))
        } catch (error) {
            fs.writeFileSync(this.pathProducto, JSON.stringify(this.productos, null, "\t"))
        }
    }

    getProductos(): Array<Producto> {
        fs.readFile(this.pathProducto, "utf8", (error, content: string) => {
            if (error) {
                console.error("Hubo un error con fs.readFile de producto!");
            } else {
                this.productos = [];
                const savedProducts = JSON.parse(content);
                savedProducts.forEach((producto: Producto) => {
                    this.productos.push(producto);
                });
            }
        });
        return this.productos;
    };

    getProductoById(id: string): Producto | undefined {
        return this.productos.find((element) => element._id === id)
    };

    updateProducto(id: string, producto: Producto): void {
        const productToBeUpdate: any = this.getProductoById(id);
        this.productos.map((thisProduct) => {
            if (thisProduct._id === productToBeUpdate._id) {
                const index = this.productos.indexOf(thisProduct);
                this.productos[index] = { ...producto, _id: id };
                fs.writeFileSync(this.pathProducto, JSON.stringify(this.productos, null, "\t"))
            }
        })
    };

    deleteProducto(id: string): void {
        const productoToBeDelete: any = this.getProductoById(id);
        const index = this.productos.indexOf(productoToBeDelete);
        this.productos.splice(index, 1);
        fs.writeFileSync(this.pathProducto, JSON.stringify(this.productos, null, "\t"));
    };

    /////////////////////////////////////////////////////////////////////////////////////////////

    insertOrder(order: Array<Cart>): void {
        // console.log(order[0].producto,'en dao');
        const newOrder: Order = new Order(
            String(this.countOrder),
            Date.now(),
            order
        );
        this.carrito = [];
        fs.writeFileSync(this.pathOrder, JSON.stringify(newOrder, null, "\t"));
        fs.unlinkSync(this.pathCarrito)
        this.countOrder++;
    }

    insertProductToCarrito(producto: Producto): void {
        const _id = String(this.countCarrito);
        const newCarrito = {
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto,
        }
        this.carrito.push(newCarrito);
        try {
            const carritoFromTxt = fs.readFileSync(this.pathCarrito, 'utf-8');
            const jsonCarritoFromTxt = JSON.parse(carritoFromTxt);
            const array = [...jsonCarritoFromTxt, newCarrito];
            fs.writeFileSync(this.pathCarrito, JSON.stringify(array, null, "\t"))
        } catch (error) {
            fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
        }
        this.countCarrito++;
    }

    getCarrito(): Array<Cart> {
        fs.readFile(this.pathCarrito, "utf8", (error, content: string) => {
            if (error) {
                console.error("Hubo un error con fs.readFile de carrito!");
            } else {
                this.carrito = [];
                const savedCarrito = JSON.parse(content);
                savedCarrito.forEach((carrito: Cart) => {
                    this.carrito.push(carrito);
                });
            }
        });
        return this.carrito;
    }

    getCarritoById(id: string): Cart | undefined {
        return this.carrito.find((element) => element._id === id);
    }

    updateQtyInCarrito(carrito: Cart): void {
        const newCarrito: Cart = {
            ...carrito,
            quantity: carrito.quantity + 1,
        };
        const index = this.carrito.indexOf(carrito);
        this.carrito[index] = newCarrito;
        fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
    }

    deleteCarrito(id: string): void {
        const productoToBeDelete: any = this.getCarritoById(id);
        const index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
        fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getMensajes(): Array<Mensaje> {
        fs.readFile(this.pathMensajes, "utf8", (error, content: string) => {
            if (error) {
                console.error("Hubo un error con fs.readFile de mensaje!");
            } else {
                this.mensajes = [];
                const savedMensajes = JSON.parse(content);
                savedMensajes.forEach((msj: Mensaje) => {
                    this.mensajes.push(msj);
                });
            }
        });
        return this.mensajes;
    }

    insertMensajes(mensaje: Mensaje): void {
        this.mensajes.push(mensaje);
        fs.writeFileSync(this.pathMensajes, JSON.stringify(this.mensajes, null, "\t"));
    }

}