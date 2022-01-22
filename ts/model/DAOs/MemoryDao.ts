import mongoose from "mongoose";
import { IDao } from "./interfaces/IDao";
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { Mensaje, MensajeWrap } from "./interfaces/IMensaje";
import { usuarioModel as User } from '../models/usuarios';
import { loggerError, loggerInfo, loggerWarn } from "../../utils/loggers";
import { productoDTOForMemory, insertUpdateProductoDTOForMemory } from "../DTOs/ProductoDto";
import { orderFinalDTO, orderProductoAdminDTO, orderProductoClientDTO } from "../DTOs/OrdenDto";
import { MensajeDTO } from "../DTOs/MensajeDto";



export class MemoryDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    mensajes: Array<Mensaje>
    countProducto: number;
    countCarrito: number;
    countOrder: number;
    private MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';


    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();
        this.countProducto = 1;
        this.countCarrito = 1;
        this.countOrder = 1;
        this.conectar();
    }

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


    filterProducto(filtro: string[], filterBy: string): Array<Producto> {
        const productos: Array<Producto> = [];
        if (filterBy === 'nombre') {
            const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
            this.productos.forEach((producto: Producto) => {
                if (producto.title === filtro[0] || producto.title === filtroCapitalized) {
                    productos.push(productoDTOForMemory(producto));
                }
            })
        } else if (filterBy === 'codigo') {
            this.productos.forEach((producto: Producto) => {
                if (producto.code === filtro[0]) {
                    productos.push(productoDTOForMemory(producto));
                }
            })
        } else if (filterBy === 'precio') {
            this.productos.forEach((producto: Producto | any) => {
                if ((Number(producto.price) >= Number(filtro[0])) && (Number(producto.price) <= Number(filtro[1]))) {
                    productos.push(productoDTOForMemory(producto));
                }
            })
        } else if (filterBy === 'stock') {
            this.productos.forEach((producto: Producto | any) => {
                if ((Number(producto.stock) >= Number(filtro[0])) && (Number(producto.stock) <= Number(filtro[1]))) {
                    productos.push(productoDTOForMemory(producto));
                }
            })
        }
        return productos
    }

    insertProducto(producto: Producto): void {
        const productoDTO = insertUpdateProductoDTOForMemory(producto, String(this.countProducto))
        this.productos.push(productoDTO);
        this.countProducto++;
    }

    getProductos(): Array<Producto> {
        const productos: Array<Producto> = [];
        this.productos.map((producto) => {
            productos.push(productoDTOForMemory(producto))
        })
        return productos
    };

    getProductoById(id: string): Producto | undefined {
        return this.productos.find((element) => element._id === id)
    };

    updateProducto(id: string, producto: Producto): void {
        const productToBeUpdate: any = this.getProductoById(id);
        this.productos.map((thisProduct) => {
            if (thisProduct._id === productToBeUpdate._id) {
                const index = this.productos.indexOf(thisProduct);
                this.productos[index] = insertUpdateProductoDTOForMemory(producto, id);
            }
        })
    };

    deleteProducto(id: string): void {
        const productoToBeDelete: any = this.getProductoById(id);
        const index = this.productos.indexOf(productoToBeDelete);
        this.productos.splice(index, 1);
    };

    insertOrder(order: Array<Cart>) {

        try {
            const orderToSend = [];
            const adminOrder = [];
            const clientOrder = [];

            for (let i = 0; i < order.length - 1; i += 1) {
                adminOrder.push(orderProductoAdminDTO(order[i]));
                clientOrder.push(orderProductoClientDTO(order[i]));
            }
            const finalOrder = orderFinalDTO(String(this.countOrder), adminOrder, clientOrder, order[order.length - 1].orderTotal);
            orderToSend.push(finalOrder);
            this.carrito = [];
            this.countOrder++;
            loggerInfo.info('Orden insertada correctamente');
            loggerWarn.warn(orderToSend);
            return orderToSend;

        } catch (error) {
            loggerError.error(`MongoDB: Error en insertOrder: ${error}`)

        }
    }

    insertProductToCarrito(producto: Producto): void {

        const _id = String(this.countCarrito);
        const productoDTO = productoDTOForMemory(producto);
        const newCarrito = {
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto: productoDTO
        }
        this.carrito.push(newCarrito);
    }

    getCarrito(): Array<Cart> {
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

            }
        })


    }

    deleteCarrito(id: string): void {
        const productoToBeDelete: any = this.getCarritoById(id);
        const index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
    }

    getMensajeById(id: string): Mensaje | undefined {
        return this.mensajes.find((element) => String(element.id) === id);
    }

    async getMensajes(): Promise<MensajeWrap> {
        try {
            const wrapMensajes = MensajeDTO(this.mensajes);
            return wrapMensajes;
        } catch (error) {
            loggerError.error(error);
            throw error;
        }
    }

    insertMensajes(mensaje: Mensaje): void {
        this.mensajes.push(mensaje);
    }


}