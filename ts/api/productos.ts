import { dao } from "../app";
import { Producto } from "../model/DAOs/interfaces/IProducto";
import * as faker from 'faker';


class ApiProductos {
    
    generateData = (cantidadAGenerar: number) => {
        const productoTest: Producto[] = [];
        for (let i = 0; i < cantidadAGenerar; i++) {
            const newProducto: Producto = new Producto(
                faker.commerce.productName(),
                faker.commerce.productDescription(),
                faker.commerce.productAdjective(),
                faker.image.image(),
                Number(faker.commerce.price()),
                Number(faker.commerce.price()),
            );
            productoTest.push(newProducto);
        }
        return productoTest;
    };

    getVistaTest =  (cant: number) => {
        const cantidadAGenerar = isNaN(cant) ? 10 : cant;
        const fakeProductos = this.generateData(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            return fakeProductos;
        } else {
            return false
        }
    };

    getProductos = async (id: string) => {
        let response;
        if (id) {
            const productoById: Producto | undefined = await dao.getProductoById(id);
            response = String(productoById?._id) === id ? productoById : false;
        } else {
            const products = await dao.getProductos();
            response = products.length > 0 ? products : false;
        }
        return response;
    };

    postProducto = async (producto: Producto) => {
        const newProducto: Producto = new Producto(
            producto.title,
            producto.description,
            producto.code,
            producto.thumbnail,
            producto.price,
            producto.stock
        );
        try {
            await dao.insertProducto(newProducto);
            return true;
        } catch (error) {
            return false;
        }
    };

    putProducto = async (id: string, producto: Producto) => {
        const newProducto: Producto = new Producto(
            producto.title,
            producto.description,
            producto.code,
            producto.thumbnail,
            producto.price,
            producto.stock
        );
        try {
            await dao.updateProducto(id, newProducto);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    deleteProducto = async (id: string) => {
        try {
            const productToBeDelete: Producto | undefined = await dao.getProductoById(id);
            if (productToBeDelete) {
                await dao.deleteProducto(productToBeDelete._id);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    };

    updateStock = async (producto: Producto) => {
        if ((producto.stock - 1) >= 0) {
            producto.stock = producto.stock - 1;
            await dao.updateProducto(producto._id, producto);
            const productoUpdated: Producto | undefined = await dao.getProductoById(producto._id);
            return productoUpdated;
        } else {
            return false;
        }
    };

    restoreStock = async (producto: Producto, qty: number) => {
        producto.stock = producto.stock + qty;
        await dao.updateProducto(producto._id, producto);
        const productoUpdated: Producto | undefined = await dao.getProductoById(producto._id);
        return productoUpdated;
    };
}



module.exports = ApiProductos;
