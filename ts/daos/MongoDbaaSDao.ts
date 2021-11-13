import mongoose from "mongoose";
import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { Mensaje, MensajeWrap } from "../interfaces/IMensaje";
import { productoModel } from "../models/productos";
import { mensajesModel } from "../models/mensajes";
import { carritoModel } from "../models/carrito";
import { ordenModel } from "../models/order";
import { usuarioModel } from "../models/usuarios";
import { sessionModel } from "../models/sessions";
import { loggerError, loggerInfo } from "../loggers";



export class MongoDbaaSDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    mensajes: Array<Mensaje>;
    countMensaje: number;
    countOrder: number;
    dbConnection: any;
    MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
    usuarioOk: boolean;

    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();
        this.usuarioOk = false;
        this.countMensaje = 1;
        this.countOrder = 1;
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


    async getSession(): Promise<any> {
        const savedSession = await sessionModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
        if (savedSession.length > 0) {
            return true
        } else {
            return false
        }


    }

    async getUsuario(usuario: string): Promise<boolean> {
        try {
            const savedUsers = await usuarioModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
            savedUsers.forEach((user: string | any) => {
                if (user.userName === usuario) {
                    this.usuarioOk = true;
                } else {
                    this.usuarioOk = false;
                }
            })
        } catch (error) {

            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return this.usuarioOk;
        }
    }

    async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
        try {
            this.productos = [];
            if (filterBy === 'nombre') {
                const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
                const productosByName = await productoModel.find({ $or: [{ 'title': String(filtro[0]) }, { 'title': String(filtroCapitalized) }] })
                productosByName.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'codigo') {
                const productosByCode = await productoModel.find({ 'code': String(filtro[0]) })
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
            const { _id, timestamp, ...productoMoficado } = producto;

            await productoModel.insertMany(productoMoficado);
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            loggerInfo.info('Producto Agregado');
        }
    }

    async getProductos(): Promise<Producto[]> {
        try {
            this.productos = [];

            const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
            savedProducts.forEach((producto: string | any) => {
                this.productos.push(producto);
            })
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return this.productos;
        }
    };

    getProductoById(id: string): Producto | undefined {

        return this.productos.find((element) => String(element._id) === id)
    };

    async updateProducto(id: string, productoToBeUpdate: Producto) {
        try {

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
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Producto modificado', productoToBeUpdate.title);
            // await mongoose.disconnect();
        }
    };


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
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

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
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Orden Agregada', JSON.stringify(await ordenModel.find().sort({ _id: -1 }).limit(1)));
            // await mongoose.disconnect();
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

    async getCarrito(): Promise<Cart[]> {
        try {
            this.carrito = [];

            const carritosEnDB = await carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 });
            carritosEnDB.forEach((carrito: string | any) => {
                this.carrito.push(carrito);
            });
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return this.carrito;
        }
    }

    getCarritoById(id: string): Cart | undefined {

        return this.carrito.find((element) => String(element._id) === id);
    }


    async updateQtyInCarrito(carrito: Cart) {
        try {

            await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1 } });
            await this.getCarrito();
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Se agrego un producto similar al mismo carrito', carrito.producto.title)
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getMensajeById(id: string): Mensaje | undefined {
        return this.mensajes.find((element) => String(element.id) === id);
    }

    async getMensajes(): Promise<MensajeWrap> {
        try {
            this.mensajes = [];
            const savedMensajes = await mensajesModel.find({}, { __v: 0, _id: 0 })
            savedMensajes.forEach((mensaje: Mensaje | any) => {
                this.mensajes.push(mensaje);
            })
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            const mensajes = new MensajeWrap('999', this.mensajes)
            return mensajes;
        }
    }

    async insertMensajes(mensaje: Mensaje) {
        try {
            await mensajesModel.insertMany(mensaje)
            this.mensajes.push(mensaje);
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Mensaje Agregado');
        }
    }
}
