import { Cart } from "../interfaces/ICart";
import { Producto } from "../interfaces/IProducto";
import { loggerError, loggerInfo, loggerWarn } from "../loggers";
import { carritoModel } from "../models/carrito";
import { ordenModel } from "../models/order";

const carrito: Cart[] = [];

module.exports = {

    getCarritoById(id: string): Cart | undefined {
        return carrito.find((element) => String(element._id) === id);
    },

    async getCarrito(): Promise<Cart[]> {
        try {
            carrito.splice(0, carrito.length);
            const carritosEnDB = await carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 });
            carritosEnDB.forEach((cart: string | any) => {
                carrito.push(cart);
            });
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return carrito;
        }
    },
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
    },
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
    },
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
    },
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