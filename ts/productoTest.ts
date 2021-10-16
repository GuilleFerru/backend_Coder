import * as faker from 'faker';
import { Producto } from './interfaces/IProducto';

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



