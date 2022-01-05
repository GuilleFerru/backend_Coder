import { Producto } from "../interfaces/IProducto";
import { dao } from "../app";
import * as faker from 'faker';
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";




export const generateData = (cantidadAGenerar: number) => {
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
}


module.exports = {

    getVistaTest: function (cant: number) {
        const cantidadAGenerar = isNaN(cant) ? 10 : cant;
        const fakeProductos = generateData(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            return fakeProductos;
        } else {
            return false
        }


    },

    getProductos: async (id: string) => {
        
        const productoById: Producto | undefined = await dao.getProductoById(id);
        if (productoById) {
            if (String(productoById._id) === id) {
                return productoById;
            } else {

            }
        } else {
            const products = await dao.getProductos();
            if (products.length > 0) {
                return products;
            } else {
                return '';
            }
        }
    },

    postProducto: async (producto: Producto) => {
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
    },

    putProducto: async (id: string, producto: Producto) => {
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
    },
    deleteProducto: async (id: string) => {
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
    },


}
