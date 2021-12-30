import mongoose from "mongoose";
import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Mensaje, MensajeWrap } from "../interfaces/IMensaje";
import { Cart } from "../interfaces/ICart";
import { usuarioModel as User } from '../models/usuarios';
import { productoModel } from "../models/productos";
import { mensajesModel } from "../models/mensajes";
import { carritoModel } from "../models/carrito";
import { ordenModel } from "../models/order";
import { loggerError, loggerInfo, loggerWarn } from "../loggers";


export class MongoDbaaSDao implements IDao {
    
    productos: Producto[];
    carrito: Cart[];
    order: Cart[];
    mensajes: Mensaje[];
    dbConnection: any;
    private MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';

  constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();
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

    getProductoById(id: string): Producto | undefined {
        return this.productos.find((element) => String(element._id) === id)
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
            return producto;
            
        }
    }

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
            const wrapMensajes = new MensajeWrap('999', this.mensajes);
            return wrapMensajes;
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
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // const finalOrder = JSON.stringify(await ordenModel.find({}, { _id: 0, productos: { _id: 0, producto: { _id: 0, description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1))
            const finalOrder: any = await ordenModel.find({}, { productos: { _id: 0, producto: { _id: 0, description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1)
            loggerWarn.warn('Orden Agregada', JSON.stringify(finalOrder));
            return finalOrder
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

}




// const productos: Producto[] = [];
// const mensajes: Mensaje[] = [];
// const carrito: Cart[] = [];

// module.exports = {

//     async findUser(username: string): Promise<any> {
//         const user = await User.findOne({ username: username })
//         return user;
//     },

//     getProductoById(id: string): Producto | undefined {
//         return productos.find((element) => String(element._id) === id)
//     },

//     async getProductos(): Promise<Producto[]> {
//         try {
//             productos.splice(0, productos.length);
//             const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
//             savedProducts.forEach((producto: string | any) => {
//                 productos.push(producto);
//             })
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             // await mongoose.disconnect();
//             return productos;
//         }
//     },

//     async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
//         try {
//             this.productos = [];
//             if (filterBy === 'nombre') {
//                 const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
//                 const productosByName = await productoModel.find({ $or: [{ 'title': String(filtro[0]) }, { 'title': String(filtroCapitalized) }] })
//                 productosByName.forEach((producto: string | any) => {
//                     this.productos.push(producto);
//                 })
//             } else if (filterBy === 'codigo') {
//                 const productosByCode = await productoModel.find({ 'code': String(filtro[0]) })
//                 productosByCode.forEach((producto: string | any) => {
//                     this.productos.push(producto);
//                 })
//             } else if (filterBy === 'precio') {
//                 const productosByPrecio = await productoModel.find({ 'price': { $gte: filtro[0], $lte: filtro[1] } })
//                 productosByPrecio.forEach((producto: string | any) => {
//                     this.productos.push(producto);
//                 })
//             } else if (filterBy === 'stock') {
//                 const productosByStock = await productoModel.find({ 'stock': { $gte: filtro[0], $lte: filtro[1] } })
//                 productosByStock.forEach((producto: string | any) => {
//                     this.productos.push(producto);
//                 })
//             }
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             return this.productos
//         }
//     },

//     async insertProducto(producto: Producto) {
//         try {
//             const { _id, timestamp, ...productoMoficado } = producto;
//             await productoModel.insertMany(productoMoficado);
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             // await mongoose.disconnect();
//             loggerInfo.info('Producto Agregado');
//             return producto;
            
//         }
//     },
//     async updateProducto(id: string, productoToBeUpdate: Producto) {
//         try {

//             await productoModel.updateOne({ _id: id }, {
//                 $set: {
//                     title: productoToBeUpdate.title,
//                     description: productoToBeUpdate.description,
//                     code: productoToBeUpdate.code,
//                     thumbnail: productoToBeUpdate.thumbnail,
//                     price: productoToBeUpdate.price,
//                     stock: productoToBeUpdate.stock
//                 }
//             }, { multi: true });
//             await this.getProductos();
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Producto modificado', productoToBeUpdate.title);
//             // await mongoose.disconnect();
//         }
//     },

//     async deleteProducto(id: string) {
//         try {

//             await productoModel.deleteMany({ _id: id });
//             await this.getProductos();
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Producto Eliminado');
//             // await mongoose.disconnect();
//         }
//     },

//     getMensajeById(id: string): Mensaje | undefined {
//         return mensajes.find((element) => String(element.id) === id);
//     },

//     async getMensajes(): Promise<MensajeWrap> {
//         try {
            
//             mensajes.splice(0, mensajes.length);
//             const savedMensajes = await mensajesModel.find({}, { __v: 0, _id: 0 })
            
//             savedMensajes.forEach((mensaje: Mensaje | any) => {
//                 mensajes.push(mensaje);
//             })
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             const wrapMensajes = new MensajeWrap('999', mensajes);
//             return wrapMensajes;
//         }
//     },

//     async insertMensajes(mensaje: Mensaje) {
//         try {
//             await mensajesModel.insertMany(mensaje)
//             mensajes.push(mensaje);
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Mensaje Agregado');
//         }
//     },
//     getCarritoById(id: string): Cart | undefined {
//         return carrito.find((element) => String(element._id) === id);
//     },

//     async getCarrito(): Promise<Cart[]> {
//         try {
//             carrito.splice(0, carrito.length);
//             const carritosEnDB = await carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 });
//             carritosEnDB.forEach((cart: string | any) => {
//                 carrito.push(cart);
//             });
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             // await mongoose.disconnect();
//             return carrito;
//         }
//     },

//     async insertOrder(order: Array<Cart>) {
//         try {
//             const orderTotal: any = order.pop();
//             for (const carrito of order) {
//                 await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "cerrado": true } });
//                 delete carrito.cerrado;
//             }
//             await ordenModel.insertMany({
//                 productos: order,
//                 orderTotal: orderTotal.orderTotal
//             });
//             await this.getCarrito();
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             // const finalOrder = JSON.stringify(await ordenModel.find({}, { _id: 0, productos: { _id: 0, producto: { _id: 0, description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1))
//             const finalOrder: any = await ordenModel.find({}, { productos: { _id: 0, producto: { _id: 0, description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1)
//             loggerWarn.warn('Orden Agregada', JSON.stringify(finalOrder));
//             return finalOrder
//             // await mongoose.disconnect();
//         }
//     },
//     async insertProductToCarrito(producto: Producto) {
//         try {

//             await carritoModel.insertMany({
//                 quantity: 1,
//                 producto: producto
//             });
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Producto agregado a carrito', producto.title);
//             // await mongoose.disconnect();
//         }
//     },
//     async updateQtyInCarrito(carrito: Cart) {
//         try {
//             await carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1 } });
//             await this.getCarrito();
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Se agrego un producto similar al mismo carrito', carrito.producto.title)
//             // await mongoose.disconnect();
//         }
//     },
//     async deleteCarrito(id: string) {
//         try {
//             await carritoModel.deleteMany({ _id: id });
//             await this.getCarrito();
//         } catch (error) {
//             loggerError.error(error);
//             throw error;
//         } finally {
//             loggerInfo.info('Producto en carrito Eliminado');
//             // await mongoose.disconnect();
//         }
//     }
// }