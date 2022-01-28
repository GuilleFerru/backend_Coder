import mongoose from "mongoose";
import * as fs from "fs";
import { IDao } from "./interfaces/IDao";
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { usuarioModel as User } from '../models/usuarios';
import { loggerError, loggerInfo } from "../../utils/loggers";
import { productoDTOForFile, insertUpdateProductoDTOForFile } from "../DTOs/ProductoDto";
import { orderFinalDTO, orderProductoAdminDTO, orderProductoClientDTO } from "../DTOs/OrdenDto";
const config = require('../../../config.js');

export class FileSystemDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    countCarrito: number;
    countOrder: number;
    private MONGO_URL = config.MONGO_URL;


    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.conectar();
    }

    // private pathProducto = "./fileSystemDB/productos.txt"
    // private pathCarrito ="./fileSystemDB/carrito.txt"
    // private pathOrder="./fileSystemDB/order.txt"

    private pathProducto = config.FILE_PATH_PRODUCTOS;
    private pathCarrito = config.FILE_PATH_CARRITO;
    private pathOrder = config.FILE_PATH_ORDER;


    async conectar() {
        try {
            loggerInfo.info('Base de datos MongoDBAaS para USER PASSPORT conectada');
            return await mongoose.connect(this.MONGO_URL);
        }
        catch (err) {
            loggerError.error(`MongoDB: Error en conectar: ${err}`)
            throw err
        }
    }

    async findUser(username: string): Promise<any> {
        const user = await User.findOne({ username: username })
        return user;
    }


    private getNewId(): string {
        const maxId: number = Math.max(...this.productos.map(prd => Number(prd._id)), 0);
        const newId: number = maxId + 1;
        return String(newId);
    }

    filterProducto(filtro: string[], filterBy: string): Array<Producto> {
        const productos: Array<Producto> = [];
        if (filterBy === 'nombre') {
            const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
            this.productos.forEach((producto: Producto) => {
                if (producto.title.includes(filtroCapitalized)) {
                    productos.push(productoDTOForFile(producto));
                }
            });
        } else if (filterBy === 'codigo') {
            this.productos.forEach((producto: Producto) => {
                if (producto.code.includes(filtro[0])) {
                    productos.push(productoDTOForFile(producto));
                }
            });
        } else if (filterBy === 'precio') {
            this.productos.forEach((producto: Producto | any) => {
                if ((Number(producto.price) >= Number(filtro[0])) && (Number(producto.price) <= Number(filtro[1]))) {
                    productos.push(productoDTOForFile(producto));
                }
            });
        } else if (filterBy === 'stock') {
            this.productos.forEach((producto: Producto | any) => {
                if ((Number(producto.stock) >= Number(filtro[0])) && (Number(producto.stock) <= Number(filtro[1]))) {
                    productos.push(productoDTOForFile(producto));
                }
            });
        }
        return productos
    }


    insertProducto(producto: Producto): void {
        producto._id = this.getNewId();
        this.productos.push(productoDTOForFile(producto))
        try {
            const productosFromTxt = fs.readFileSync(this.pathProducto, 'utf-8');
            const jsonProductosFromTxt = JSON.parse(productosFromTxt);
            const productoDtoToSave = insertUpdateProductoDTOForFile(producto, producto._id);
            const productosNew = [...jsonProductosFromTxt, productoDtoToSave];
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
                    this.productos.push(productoDTOForFile(producto));

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
                this.productos[index] = insertUpdateProductoDTOForFile(producto, id)
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

    insertOrder(order: Array<Cart>) {

        const orderToSend = [];
        const adminOrder = [];
        const clientOrder = [];
        this.carrito = [];
        for (let i = 0; i < order.length - 1; i += 1) {
            adminOrder.push(orderProductoAdminDTO(order[i]));
            clientOrder.push(orderProductoClientDTO(order[i]));
        }

        const finalOrder = orderFinalDTO(String(this.countOrder), adminOrder, clientOrder, order[order.length - 1].orderTotal);
        orderToSend.push(finalOrder);

        fs.writeFileSync(this.pathOrder, JSON.stringify(orderToSend, null, "\t"));
        fs.unlinkSync(this.pathCarrito);
        this.countOrder++;
        return orderToSend;
    }

    insertProductToCarrito(producto: Producto): void {
        const _id = String(this.countCarrito);
        const productoDTO = productoDTOForFile(producto);
        const newCarrito = {
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto: productoDTO
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
                this.carrito.splice(0, this.carrito.length);
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

        this.carrito.map((thisCarrito) => {
            if (thisCarrito._id === newCarrito._id) {
                const index = this.carrito.indexOf(thisCarrito);
                this.carrito[index] = newCarrito;
                fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
            }
        })
    }

    deleteCarrito(id: string): void {
        const productoToBeDelete: any = this.getCarritoById(id);
        const index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
        fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}