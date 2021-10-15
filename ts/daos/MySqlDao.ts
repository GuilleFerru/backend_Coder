import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { Order } from "../interfaces/IOrder";
import { Mensaje } from "../interfaces/IMensaje";

const optionsMariaDB = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "ecommerce",
    },
};

export class MySqlDao implements IDao {
    productos: Array<Producto>;
    carrito: Array<Cart>;
    order: Array<Cart>;
    mensajes: Array<Mensaje>
    countCarrito: number;
    countOrder: number;
    knex: any;


    constructor() {
        this.productos = new Array<Producto>();
        this.carrito = new Array<Cart>();
        this.order = new Array<Cart>();
        this.mensajes = new Array<Mensaje>();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.knex = require("knex")(optionsMariaDB);
        
    }
    filterProducto(filtro: string[]): Producto[] | Promise<Producto[]> {
        throw new Error("Method not implemented.");
    }


    private createTableMensajes = async () => {
          // const knex = require("knex")(optionsMariaDB);
        try {
            const tableName = "mensajes";
            if (await this.knex.schema.hasTable(tableName)) {
                return;
            } else {
                console.log('mensajes Table create');
                await this.knex.schema.createTable(tableName, (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; }) => {
                    table.increments("_id").primary();
                    table.string("date").notNullable();
                    table.string("author").notNullable();
                    table.string("text");
                }
                );
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

    async insertProducto(producto: Producto) {
        // const knex = require("knex")(optionsMariaDB);
        try {
            await this.knex("productos").insert([
                {
                    timestamp: Number(Date.now()),
                    title: producto.title,
                    description: producto.description,
                    code: producto.code,
                    thumbnail: producto.thumbnail,
                    price: producto.price,
                    stock: producto.stock,
                },
            ]);
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
        await this.createTableMensajes();

        // const knex = require("knex")(optionsMariaDB);
        try {
            const productosFromDB = await this.knex.from("productos").select("*");
            this.productos = [];
            for (const producto of productosFromDB) {
                producto._id = String(producto._id)
                this.productos.push(producto);
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await this.knex.destroy();

            return this.productos;
        }
    };

    getProductoById(id: string): Producto | undefined {

        return this.productos.find((element) => element._id === id)
    };

    async updateProducto(id: string, productoToBeUpdate: Producto) {
        // const knex = require("knex")(optionsMariaDB);
        try {
            await this.knex.from("productos").where("_id", Number(id)).update({
                title: productoToBeUpdate.title,
                description: productoToBeUpdate.description,
                code: productoToBeUpdate.code,
                thumbnail: productoToBeUpdate.thumbnail,
                price: productoToBeUpdate.price,
                stock: productoToBeUpdate.stock
            })
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
            // knex.destroy();
        }

    };

    async deleteProducto(id: string) {
        // const knex = require("knex")(optionsMariaDB);
        try {
            const productoToBeDelete: any = this.getProductoById(id);
            const index = this.productos.indexOf(productoToBeDelete);
            await this.knex.from("productos").where("_id", Number(id)).del();
            this.productos.splice(index, 1);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // knex.destroy();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

    async insertOrder(order: Array<Cart>) {
        // const knex = require("knex")(optionsMariaDB);
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
            this.carrito = [];
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
        // const knex = require("knex")(optionsMariaDB);
        try {
            await this.knex.from("carrito").where("_id", Number(carrito._id)).update({ quantity: carrito.quantity + 1 })
            const newCarrito: Cart = {
                ...carrito,
                quantity: carrito.quantity + 1,
            };
            const index = this.carrito.indexOf(carrito);
            this.carrito[index] = newCarrito;
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

    async getMensajes(): Promise<Mensaje[]> {

        // const knex = require("knex")(optionsMariaDB);
        try {
            const mensajesFromDB = await this.knex.from("mensajes").select("*");
            this.mensajes = [];
            for (const mensaje of mensajesFromDB) {
                mensaje._id = String(mensaje._id)
                this.mensajes.push(mensaje);
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            // await knex.destroy();

            return this.mensajes;
        }
    }

    async insertMensajes(mensaje: Mensaje) {
        // const knex = require("knex")(optionsMariaDB);
        try {
            this.mensajes.push(mensaje);
            await this.knex("mensajes").insert([
                {
                    date: mensaje.date,
                    author: mensaje.author,
                    text: mensaje.text,
                },
            ]);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Mensaje Agregado');
            // await knex.destroy();
        }
    }
}