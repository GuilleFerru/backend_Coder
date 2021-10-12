import mongoose from "mongoose";
import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { Order } from "../interfaces/IOrder";
import { Mensaje } from "../interfaces/IMensaje";
import { productoModel } from "../models/productos";
import { mensajesModel } from "../models/mensajes";
import { carritoModel } from "../models/carrito";
import { ordenModel } from "../models/order";

const MONGO_URL = 'mongodb://localhost:27017/ecommerce';


export class MongoDbDao implements IDao {
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


    async insertProducto(producto: Producto) {
        try {
            const { _id, timestamp, ...productoMoficado } = producto;
            await mongoose.connect(MONGO_URL);
            await productoModel.insertMany(productoMoficado);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await mongoose.disconnect();
            console.log('Producto Agregado');
        }
    }

    async getProductos(): Promise<Producto[]> {
        try {
            this.productos = [];
            await mongoose.connect(MONGO_URL);
            const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
            savedProducts.forEach((producto: string | any) => {
                this.productos.push(producto);
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await mongoose.disconnect();
            return this.productos;
        }
    };

    getProductoById(id: string): Producto | undefined {

        return this.productos.find((element) => String(element._id) === id)
    };

    async updateProducto(id: string, productoToBeUpdate: Producto) {
        try {
            await mongoose.connect(MONGO_URL);
            await productoModel.updateOne({ _id: id }, {
                $set: {
                    title: productoToBeUpdate.title,
                    description: productoToBeUpdate.description,
                    code: productoToBeUpdate.code,
                    thumbnail: productoToBeUpdate.thumbnail,
                    price: productoToBeUpdate.price,
                    stock: productoToBeUpdate.stock
                }
            }, { multi: true });
            await this.getProductos();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto modificado', productoToBeUpdate.title);
            await mongoose.disconnect();
        }
    };

    
    async deleteProducto(id: string) {
        try {
            await mongoose.connect(MONGO_URL);
            await productoModel.deleteMany({ _id: id });
            await this.getProductos();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto Eliminado');
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

    async insertOrder(order: Array<Cart>) {
        try {
            await mongoose.connect(MONGO_URL);
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
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Orden Agregada',JSON.stringify(await ordenModel.find().sort({_id:-1}).limit(1)));
            await mongoose.disconnect();
            
        }
    }

    async insertProductToCarrito(producto: Producto) {
        try {
            await mongoose.connect(MONGO_URL);
            await carritoModel.insertMany({
                quantity: 1,
                producto: producto
            });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto agregado a carrito', producto.title);
            await mongoose.disconnect();
        }
    }

    async getCarrito(): Promise<Cart[]> {
        try {
            this.carrito = [];
            await mongoose.connect(MONGO_URL);
            const carritosEnDB = await carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 });
            carritosEnDB.forEach((carrito: string | any) => {
                this.carrito.push(carrito);
            });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {

            return this.carrito;
        }
    }

    getCarritoById(id: string): Cart | undefined {

        return this.carrito.find((element) => String(element._id) === id);
    }


    async updateQtyInCarrito(carrito: Cart) {
        try {
            await mongoose.connect(MONGO_URL);
            await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1 } });
            await this.getCarrito();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Se agrego un producto similar al mismo carrito', carrito.producto.title)
            await mongoose.disconnect();
        }
    }

    async deleteCarrito(id: string) {
        try {
            await mongoose.connect(MONGO_URL);
            await carritoModel.deleteMany({ _id: id });
            await this.getCarrito();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto en carrito Eliminado');
            await mongoose.disconnect();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getMensajes(): Promise<Mensaje[]> {
        try {
            this.mensajes = [];
            await mongoose.connect(MONGO_URL);
            const savedMessages = await mensajesModel.find({}, { __v: 0, _id: 0 })
            savedMessages.forEach((msg: string | any) => {
                this.mensajes.push(msg);
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await mongoose.disconnect();
            return this.mensajes;
        }
    }

    async insertMensajes(mensaje: Mensaje) {

        try {
            await mongoose.connect(MONGO_URL);
            await mensajesModel.insertMany(mensaje)
            this.mensajes.push(mensaje);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Mensaje Agregado');
            await mongoose.disconnect();
        }
    }
}
