import mongoose from "mongoose";
import { IDao } from "./interfaces/IDao";
import { usuarioModel as User } from '../models/usuarios';
import { Producto } from "./interfaces/IProducto";
import { Cart } from "./interfaces/ICart";
import { Order } from "./interfaces/IOrder";
import { loggerError, loggerInfo } from "../../utils/loggers";
import { productoDTOForSQL, insertUpdateProductoDTOForSQL } from "../DTOs/ProductoDto";
import { orderFinalDTO, orderProductoAdminDTO, orderProductoClientDTO } from "../DTOs/OrdenDto";
const config = require('../../../config.js');


export class MySqlDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    countCarrito: number;
    countOrder: number;
    knex: any;
    private MONGO_URL = config.MONGO_URL;
    private optionsMariaDB = {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "ecommerce",
        },
    };

    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.knex = require("knex")( this.optionsMariaDB) ;
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

    private createTableMensajes = async () => {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "mensajes";
            if (await this.knex.schema.hasTable(tableName)) {
                return;
            } else {
                console.log('mensajes Table create');
                await this.knex.schema.createTable(tableName, ((table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; unsigned: { (): { (): any; new(): any; index: { (): void; new(): any; }; }; new(): any; }; }; foreign: (arg0: string) => { (): any; new(): any; references: { (arg0: string): { (): any; new(): any; inTable: { (arg0: string): void; new(): any; }; }; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.string("date").notNullable();
                    table.string("text");
                    table.integer("author_id").unsigned().index();
                    table.foreign("author_id").references('_id').inTable('mensajes');
                }
                ));
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await this.knex.destroy();
        }
    }

    private createTableAuthor = async () => {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "author";
            if (await this.knex.schema.hasTable(tableName)) {
                return;
            } else {
                console.log('author Table create');
                await this.knex.schema.createTable(tableName, ((table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; unique: { (): void; new(): any; }; notNullable: { (): void; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.string("email").unique();
                    table.string("nombre").notNullable();
                    table.string("apellido").notNullable();
                    table.string("edad").notNullable();
                    table.string("alias").notNullable();
                    table.string("avatar").notNullable();

                }
                ));
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await this.knex.destroy();
        }
    }

    private createTableOrdenes = async () => {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "ordenes";
            if (await this.knex.schema.hasTable(tableName)) {

                return;
            } else {
                console.log('ordenes Table create');
                await this.knex.schema.createTable(tableName, (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; bigInteger: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; float: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.bigInteger("timestamp").notNullable();
                    table.float("orderTotal").notNullable();
                }
                );
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await knex.destroy();
        }
    }

    private createTableCarrito = async () => {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "carrito";
            if (await this.knex.schema.hasTable(tableName)) {

                return;
            } else {
                console.log('carito Table create');
                await this.knex.schema.createTable(tableName, (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; bigInteger: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; unsigned: { (): { (): any; new(): any; index: { (): { (): any; new(): any; notNullable: { (): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; foreign: (arg0: string) => { (): any; new(): any; references: { (arg0: string): { (): any; new(): any; inTable: { (arg0: string): void; new(): any; }; }; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.bigInteger("timestamp").notNullable();
                    table.integer("quantity").notNullable();
                    table.integer("producto_id").unsigned().index().notNullable();
                    table.integer("orden_id").unsigned().index();
                    table.foreign("producto_id").references('_id').inTable('productos');
                    table.foreign("orden_id").references('_id').inTable('ordenes');
                }
                );
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await knex.destroy();
        }
    }

    private createTableProductos = async () => {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "productos";
            if (await this.knex.schema.hasTable(tableName)) {

                return;
            } else {
                console.log('productos Table create');
                await this.knex.schema.createTable(tableName, (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; bigInteger: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; float: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.bigInteger("timestamp").notNullable();
                    table.string("title").notNullable();
                    table.string("description").notNullable();
                    table.string("code").notNullable();
                    table.string("thumbnail").notNullable();
                    table.float("price").notNullable();
                    table.integer("stock").notNullable();
                }
                );
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await knex.destroy();
        }
    }

    async findUser(username: string): Promise<any> {
        const user = await User.findOne({ username: username })
        return user;
    }

    async filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> {
        try {
            this.productos = [];
            if (filterBy === 'nombre') {
                const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
                const productosByName = await this.knex.from("productos").select("*").where("title", String(filtro[0])).orWhere("title", String(filtroCapitalized));
                productosByName.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'codigo') {
                const productosByCode = await this.knex.from("productos").select("*").where("code", String(filtro[0]))
                productosByCode.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'precio') {
                const productosByPrecio = await this.knex.from("productos").select("*").whereBetween('price', [filtro[0], filtro[1]])
                productosByPrecio.forEach((producto: string | any) => {
                    this.productos.push(producto);
                })
            } else if (filterBy === 'stock') {
                const productosByStock = await this.knex.from("productos").select("*").whereBetween('stock', [filtro[0], filtro[1]])
                productosByStock.forEach((producto: string | any) => {
                    this.productos.push(producto);
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
        // const knex = require("knex")(optionsMariaDB);
        try {
            await this.knex("productos").insert([insertUpdateProductoDTOForSQL(producto)]);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto Agregado');
            // await knex.destroy();
        }

    }

    async getProductos(): Promise<Producto[]> {
        await this.createTableProductos();
        await this.createTableOrdenes();
        await this.createTableAuthor();
        await this.createTableMensajes();

        try {
            const productosFromDB = await this.knex.from("productos").select("*");
            this.productos = [];
            for (const producto of productosFromDB) {
                this.productos.push(productoDTOForSQL(producto));
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            return this.productos;
        }
    };

    async getProductoById(id: string) {
        if (id !== undefined) {
            const producto = await this.knex.from("productos").where("_id", Number(id))
            return producto.pop();
        } else {
            return undefined;
        }
    };

    async updateProducto(id: string, productoToBeUpdate: Producto) {

        try {
            const producto = insertUpdateProductoDTOForSQL(productoToBeUpdate);
            await this.knex.from("productos").where("_id", Number(id)).update(producto)

            this.productos.map((thisProduct) => {
                if (thisProduct._id === id) {
                    const index = this.productos.indexOf(thisProduct);
                    this.productos[index] = { ...productoToBeUpdate, _id: id, price: Number(productoToBeUpdate.price), stock: Number(productoToBeUpdate.stock) };
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto Actualizado');
        }
    };

    async deleteProducto(id: string) {
        try {
            const productoToBeDelete: any = this.getProductoById(id);
            const index = this.productos.indexOf(productoToBeDelete);
            await this.knex.from("productos").where("_id", Number(id)).del();
            this.productos.splice(index, 1);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto Eliminado');
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

    async insertOrder(order: Array<Cart>) {
        const respondeOrderTotal = (order.slice(-1))[0].orderTotal;
        try {
            const newOrder: Order = new Order(
                String(this.countOrder),
                Date.now(),
                order
            );
            await this.knex("ordenes").insert([
                {
                    timestamp: Date.now(),
                    orderTotal: newOrder.carrito[order.length - 1].orderTotal
                },
            ]);
            order.pop();
            const lastOrderInserted = await this.knex('ordenes').max('_id as id').first();
            const _id = lastOrderInserted.id;

            for (const cart of order) {
                await this.knex.from("carrito").where("_id", Number(cart._id)).update({ orden_id: _id })
            }

            const orderToSend = [];
            const adminOrder = [];
            const clientOrder = [];
            this.carrito = [];
            for (let i = 0; i <= order.length - 1; i += 1) {
                adminOrder.push(orderProductoAdminDTO(order[i]));
                clientOrder.push(orderProductoClientDTO(order[i]));
            }

            const finalOrder = orderFinalDTO(_id, adminOrder, clientOrder, respondeOrderTotal);
            orderToSend.push(finalOrder);
            this.carrito = [];
            return orderToSend;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Orden Agregada');
            // await knex.destroy();
        }

    }

    async insertProductToCarrito(producto: Producto) {
        await this.createTableCarrito();
        // const knex = require("knex")(optionsMariaDB);
        try {
            await this.knex("carrito").insert([
                {
                    timestamp: Number(Date.now()),
                    quantity: 1,
                    producto_id: producto._id
                },
            ]);
            const lastCarritoId = await this.knex('carrito').max('_id as id').first();
            const _id = String(lastCarritoId.id);
            this.carrito.push({
                _id: _id,
                timestamp: Date.now(),
                quantity: 1,
                producto,
            });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Producto agregado a carrito');
            // await knex.destroy();
        }
    }

    async getCarrito(): Promise<Cart[]> {

        await this.createTableCarrito();
        // const knex = require("knex")(optionsMariaDB);
        try {
            const productosEnCarrito = await this.knex.from("carrito").select("*").whereNull('orden_id');
            this.carrito = [];
            for (const carrito of productosEnCarrito) {
                const productoId = carrito.producto_id;
                const productoEnCarrito = await this.knex.from("productos").select("*").where("_id", "=", productoId);
                const producto: Producto | any = productoEnCarrito[0];
                producto._id = String(producto._id)
                carrito._id = String(carrito._id);
                this.carrito.push({
                    _id: carrito._id,
                    timestamp: carrito.timestamp,
                    quantity: carrito.quantity,
                    producto,
                });
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await knex.destroy();

            return this.carrito;
        }
    }

    getCarritoById(id: string): Cart | undefined {
        return this.carrito.find((element) => element._id === id);
    }

    async updateQtyInCarrito(carrito: Cart) {
        try {
            await this.knex.from("carrito").where("_id", Number(carrito._id)).update({ quantity: carrito.quantity + 1 })
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
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // knex.destroy();
        }
    }

    async deleteCarrito(id: string) {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const productoToBeDelete: any = this.getCarritoById(id);
            const index = this.carrito.indexOf(productoToBeDelete);
            await this.knex.from("carrito").where("_id", Number(id)).del();
            this.carrito.splice(index, 1);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // knex.destroy();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}