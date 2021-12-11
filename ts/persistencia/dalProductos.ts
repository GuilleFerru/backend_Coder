import { Producto } from "../interfaces/IProducto";
import { loggerError, loggerInfo } from "../loggers";
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
    },

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
    },

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
    },
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
    },

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

}