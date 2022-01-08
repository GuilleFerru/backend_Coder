import mongoose from "mongoose";
import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { usuarioModel as User } from '../models/usuarios';
import { Mensaje, MensajeWrap } from "../interfaces/IMensaje";
import firebaseAdmin from "firebase-admin";
import { loggerError, loggerInfo } from "../loggers";


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert("./Firebase/backend-coder-firebase-adminsdk-lbpk1-51f5f41145.json"),
    databaseURL: "https://backend-coder.firebaseio.com",
});

console.log("Base de datos Firebase conectada!");


export class FirebaseDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    mensajes: Array<Mensaje>
    countCarrito: number;
    countOrder: number;
    firestoreAdmin = firebaseAdmin.firestore();
    dbConnection: any;
    private MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';



    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();
        this.countCarrito = 1;
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

    async findUser(username: string): Promise<any> {
        const user = await User.findOne({ username: username })
        return user;
    }

    private Collection(collection: string) {
        return this.firestoreAdmin.collection(collection);
    }

    private createProductoObject(producto: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): Producto {
        producto.data()._id = String(producto.id);
        const newProducto: Producto = new Producto(
            producto.data().title,
            producto.data().description,
            producto.data().code,
            producto.data().thumbnail,
            producto.data().price,
            producto.data().stock
        )
        newProducto._id = String(producto.id);
        return newProducto;
    }

    async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
        try {
            this.productos = [];
            if (filterBy === 'nombre') {
                const productosByName = await this.Collection('productos').where('title', '==', filtro[0]).get();
                productosByName.forEach(producto => {
                    const filterProducto = this.createProductoObject(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'codigo') {
                const productosByCode = await this.Collection('productos').where('code', '==', filtro[0]).get();
                productosByCode.forEach(producto => {
                    const filterProducto = this.createProductoObject(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'precio') {
                const productosByPrecio = await this.Collection('productos').orderBy('price').startAt(filtro[0]).endAt(filtro[1]).get();
                productosByPrecio.forEach(producto => {
                    const filterProducto = this.createProductoObject(producto);
                    this.productos.push(filterProducto);
                })
            } else if (filterBy === 'stock') {
                const productosByStock = await this.Collection('productos').orderBy('stock').startAt(filtro[0]).endAt(filtro[1]).get();
                productosByStock.forEach(producto => {
                    const filterProducto = this.createProductoObject(producto);
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
            const { _id, timestamp, ...productoMoficado } = producto;
            await this.Collection('productos').add(productoMoficado)
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
                const newProducto = this.createProductoObject(producto);
                this.productos.push(newProducto);
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
            await this.Collection('productos').doc(id).update({
                title: productoToBeUpdate.title,
                description: productoToBeUpdate.description,
                code: productoToBeUpdate.code,
                thumbnail: productoToBeUpdate.thumbnail,
                price: productoToBeUpdate.price,
                stock: productoToBeUpdate.stock
            });
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
            const lastOrder = await this.Collection('ordenes').orderBy('timestamp', 'desc').limit(1).get();
            let lastOrderId = lastOrder.docs[0].id;            
            const responseProductos = [];
            const responseOrder = {
                _id: lastOrderId,
                productos: order,
                orderTotal: orderTotal.orderTotal
            };
            responseProductos.push(responseOrder);     
            return responseProductos;
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
            this.Collection('carrito').doc(carrito._id).update({ quantity: carrito.quantity + 1 });
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

    async getMensajes(): Promise<MensajeWrap> {
        try {
            this.mensajes = [];
            const savedMessages = await this.Collection('mensajes').get();
            savedMessages.docs.map((mensaje: string | any) => {
                const newMensaje: Mensaje = new Mensaje(
                    mensaje.data().id,
                    mensaje.data().text,
                    mensaje.data().date,
                    mensaje.data().author
                )
                this.mensajes.push(newMensaje);
            })

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            const wrapMensajes = new MensajeWrap('999', this.mensajes);
            return wrapMensajes;
        }
    }

    getMensajeById(id: string): Mensaje | undefined {
        return this.mensajes.find((element) => String(element.id) === id);
    }


    async insertMensajes(mensaje: Mensaje) {
        try {
            const { ...mensajeModificado } = mensaje;
            const { ...authorModificado } = mensajeModificado.author;

            const saveMensaje = {
                id: mensajeModificado.id,
                text: mensajeModificado.text,
                date: mensajeModificado.date,
                author: {
                    email: authorModificado.email,
                    nombre: authorModificado.nombre,
                    apellido: authorModificado.apellido,
                    edad: authorModificado.edad,
                    alias: authorModificado.alias,
                    avatar: authorModificado.avatar
                }
            }

            await this.Collection('mensajes').add(saveMensaje)
            this.mensajes.push(mensaje);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Mensaje Agregado');
        }
    }
}