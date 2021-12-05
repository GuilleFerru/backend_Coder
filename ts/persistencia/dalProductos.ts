import { Producto } from "../interfaces/IProducto";
import { loggerError } from "../loggers";
import { productoModel } from "../models/productos";

const productos: Producto[] = [];

module.exports = {

    getProductoById(id: string): Producto | undefined {
        return productos.find((element) => String(element._id) === id)
    },

    async getProductos(): Promise<Producto[]> {
        try {
            productos.splice(0, productos.length);
            const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
            savedProducts.forEach((producto: string | any) => {
                productos.push(producto);
            })
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            // await mongoose.disconnect();
            return productos;
        }
    }

}