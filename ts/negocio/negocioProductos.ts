import { Producto } from "../interfaces/IProducto";

const dalProductos = require("../persistencia/dalProductos");

module.exports = {

    getProductos: (id: string) => {

        const productoById: Producto | undefined = dalProductos.getProductoById(id);

        if (productoById) {
            if (String(productoById._id) === id) {
                return productoById;
            } else {
                
            }
        } else {
            const products =  dalProductos.getProductos();
            if (products.length > 0) {
                return products;
            } else {
                return '';
            }
        }

    }

}
