import mongoose from "mongoose";
import { IDao } from "./interfaces/IDao";
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { usuarioModel as User } from '../models/usuarios';
import firebaseAdmin from "firebase-admin";
import { loggerError, loggerInfo } from "../../utils/loggers";
import { productoDTOForFirebase, insertUpdateProductoDTOForFirebase } from "../DTOs/ProductoDto";
import { orderFinalDTO, orderProductoAdminDTO, orderProductoClientDTO } from "../DTOs/OrdenDto";
const config = require('../../../config.js');


if (config.PERSISTENCIA === '7') {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(config.FIREBASE_CREDENTIAL),
        databaseURL: config.FIREBASE_URL,
    });

    loggerInfo.info("Base de datos Firebase conectada!");
}

export class FirebaseDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    countCarrito: number;
    countOrder: number;
    firestoreAdmin = firebaseAdmin.firestore();
    dbConnection: any;
    private MONGO_URL = config.MONGO_URL;

    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.dbConnection = this.conectar();
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

    private Collection(collection: string) {
        return this.firestoreAdmin.collection(collection);
    }

    async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
        try {
            this.productos = [];
            if (filterBy === 'nombre') {
                const productosByName = await this.Collection('productos').where('title', '==', filtro[0]).get();
                productosByName.forEach(producto => {
                    const filterProducto = productoDTOForFirebase(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'codigo') {
                const productosByCode = await this.Collection('productos').where('code', '==', filtro[0]).get();
                productosByCode.forEach(producto => {
                    const filterProducto = productoDTOForFirebase(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'precio') {
                const productosByPrecio = await this.Collection('productos').orderBy('price').startAt(filtro[0]).endAt(filtro[1]).get();
                productosByPrecio.forEach(producto => {
                    const filterProducto = productoDTOForFirebase(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'stock') {
                const productosByStock = await this.Collection('productos').orderBy('stock').startAt(filtro[0]).endAt(filtro[1]).get();
                productosByStock.forEach(producto => {
                    const filterProducto = productoDTOForFirebase(producto);
                    this.productos.push(filterProducto);
                })
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            return this.productos
        }
    }

    async insertProducto(producto: Producto) {
        try {

            await this.Collection('productos').add(insertUpdateProductoDTOForFirebase(producto));
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto Agregado');
        }
    }

    async getProductos(): Promise<Producto[]> {
        try {
            this.productos = [];
            const savedProducts = await this.Collection('productos').get();
            savedProducts.docs.map((producto: string | any) => {
                this.productos.push(productoDTOForFirebase(producto));
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            return this.productos;
        }
    };

    getProductoById(id: string): Producto | undefined {
        return this.productos.find((element) => String(element._id) === id)
    };

    async updateProducto(id: string, productoToBeUpdate: Producto) {
        try {
            const producto = insertUpdateProductoDTOForFirebase(productoToBeUpdate);
            await this.Collection('productos').doc(id).update(producto);
            await this.getProductos();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto modificado', productoToBeUpdate.title);
        }
    };


    async deleteProducto(id: string) {
        try {
            await this.Collection('productos').doc(id).delete();
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
            const orderTotal: any = order.pop();
            for (const carrito of order) {
                this.Collection('carrito').doc(carrito._id).update({ cerrado: true });
                delete carrito.cerrado;
            }
            await this.Collection('ordenes').add({
                productos: order,
                orderTotal: orderTotal.orderTotal,
                timestamp: Date.now()
            })
            await this.getCarrito();

            const orderToSend = [];
            const adminOrder = [];
            const clientOrder = [];

            for (let i = 0; i <= order.length - 1; i += 1) {
                adminOrder.push(orderProductoAdminDTO(order[i]));
                clientOrder.push(orderProductoClientDTO(order[i]));
            }
            const lastOrderInserted = await this.Collection('ordenes').orderBy('timestamp', 'desc').limit(1).get();
            const _id = lastOrderInserted.docs[0].id;
            const finalOrder = orderFinalDTO(String(_id), adminOrder, clientOrder, orderTotal.orderTotal);
            orderToSend.push(finalOrder);
            return orderToSend;

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Orden Agregada');
        }
    }

    async insertProductToCarrito(producto: Producto) {
        try {
            const { timestamp, ...productoMoficado } = producto;
            await this.Collection('carrito').add({
                quantity: 1,
                producto: productoMoficado,
                cerrado: false
            })

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto agregado a carrito', producto.title);

        }
    }

    async getCarrito(): Promise<Cart[]> {
        try {
            this.carrito = [];
            const carritosEnDB = await this.Collection('carrito').get()
            carritosEnDB.docs.map((carrito: string | any) => {
                if (carrito.data().cerrado === false) {
                    carrito.data()._id = String(carrito.id);
                    const newCarrito: Cart = new Cart(
                        carrito.data().quantity,
                        carrito.data().producto,

                    )
                    newCarrito._id = String(carrito.id);
                    newCarrito.cerrado = carrito.data().cerrado;
                    this.carrito.push(newCarrito);
                }

            })
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
            this.Collection('carrito').doc(carrito._id).update({ quantity: carrito.quantity + 1, "producto": carrito.producto });
            await this.getCarrito();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Se agrego un producto similar al mismo carrito', carrito.producto.title)
        }
    }

    async deleteCarrito(id: string) {
        try {
            await this.Collection('carrito').doc(id).delete();
            await this.getCarrito();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto en carrito Eliminado');
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}