import mongoose from "mongoose";
import { IDao } from "./interfaces/IDao";
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { usuarioModel as User } from '../models/usuarios';
import { productoModel } from "../models/productos";
import { carritoModel } from "../models/carrito";
import { ordenModel } from "../models/order";
import { loggerError, loggerInfo } from "../../utils/loggers";
import { productoDTOForMongo, insertUpdateProductoDTOForMongo } from "../DTOs/ProductoDto";
import { orderFinalDTO, orderProductoAdminDTO, orderProductoClientDTO } from "../DTOs/OrdenDto";
const config = require('../../../config.js');

export class MongoDbaaSDao implements IDao {

    productos: Producto[];
    carrito: Cart[];
    order: Cart[];
    dbConnection: Promise<typeof mongoose>;
    private MONGO_URL = config.MONGO_URL;

    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.dbConnection = this.conectar()
    }

    async conectar() {
        try {
            loggerInfo.info('Base de datos MongoDBAaS conectada!')
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

    async getProductoById(id: string): Promise<any> {
        if (id !== undefined) {
            const producto = await productoModel.findById(id);
            return productoDTOForMongo(producto);
        } else {
            return undefined;
        }
    }

    async getProductos(): Promise<Producto[]> {
        try {
            this.productos = [];
            const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
            savedProducts.forEach((producto: Producto | any) => {
                this.productos.push(productoDTOForMongo(producto));
            })
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return this.productos;
        }
    }

    async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
        try {
            this.productos = [];
            if (filterBy === 'nombre') {
                const filtroCapitalized = new RegExp("^"+filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1));
                const filtroReg = new RegExp("^" + filtro[0]);
                const productosByName = await productoModel.find({ $or: [{ 'title': filtroReg }, { 'title': filtroCapitalized}] })
              
                productosByName.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'codigo') {
                const filtroReg = new RegExp("^" + filtro[0]);
                const productosByCode = await productoModel.find({ 'code': filtroReg })
                productosByCode.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'precio') {
                const productosByPrecio = await productoModel.find({ 'price': { $gte: filtro[0], $lte: filtro[1] } })
                productosByPrecio.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'stock') {
                const productosByStock = await productoModel.find({ 'stock': { $gte: filtro[0], $lte: filtro[1] } })
                productosByStock.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            }
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            return this.productos
        }
    }

    async insertProducto(producto: Producto) {
        try {
            await productoModel.insertMany(insertUpdateProductoDTOForMongo(producto));
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto Agregado');
            return producto;
        }
    }

    async updateProducto(id: string, productoToBeUpdate: Producto) {
        try {
            const producto = insertUpdateProductoDTOForMongo(productoToBeUpdate);
            await productoModel.updateOne({ _id: id }, {
                $set: producto
            }, { multi: true });
            await this.getProductos();
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto modificado', productoToBeUpdate.title);
            // await mongoose.disconnect();
        }
    }

    async deleteProducto(id: string) {
        try {

            await productoModel.deleteMany({ _id: id });
            await this.getProductos();
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto Eliminado');
            // await mongoose.disconnect();
        }
    }

    getCarritoById(id: string): Cart | undefined {
        return this.carrito.find((element) => String(element._id) === id);
    }

    async getCarrito(): Promise<Cart[]> {
        try {
            this.carrito = [];
            const carritosEnDB = await carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 });
            carritosEnDB.forEach((cart: string | any) => {
                this.carrito.push(cart);
            });
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return this.carrito;
        }
    }

    async insertOrder(order: Array<Cart>) {
        try {
            const orderTotal: any = order.pop();
            for (const carrito of order) {
                await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "cerrado": true } });
                delete carrito.cerrado;
            }
            await ordenModel.insertMany({
                productos: order,
                orderTotal: orderTotal.orderTotal
            });
            await this.getCarrito();

            const orderToSend = [];
            const adminOrder = [];
            const clientOrder = [];

            for (let i = 0; i <= order.length - 1; i += 1) {
                adminOrder.push(orderProductoAdminDTO(order[i]));
                clientOrder.push(orderProductoClientDTO(order[i]));
            }

            const lastOrderInserted: any = await ordenModel.find({}, { productos: { producto: { description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1)
            const _id = lastOrderInserted[0]._id;
            const finalOrder = orderFinalDTO(String(_id), adminOrder, clientOrder, orderTotal.orderTotal);
            orderToSend.push(finalOrder);

            return orderToSend
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            console.log('Orden Agregada');
        }
    }

    async insertProductToCarrito(producto: Producto) {
        try {

            await carritoModel.insertMany({
                quantity: 1,
                producto: producto
            });
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto agregado a carrito', producto.title);
            // await mongoose.disconnect();
        }
    }

    async updateQtyInCarrito(cart: Cart) {
        try {

            const carrito = cart._doc;         
            await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1, "producto": cart.producto } });
            await this.getCarrito();
            loggerInfo.info('Se agrego un producto similar al mismo carrito', carrito.producto.title);

        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
        }
    }

    async deleteCarrito(id: string) {
        try {
            await carritoModel.deleteMany({ _id: id });
            await this.getCarrito();
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto en carrito Eliminado');
            // await mongoose.disconnect();
        }
    }
}