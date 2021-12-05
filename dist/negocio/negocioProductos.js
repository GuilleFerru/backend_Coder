"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dalProductos = require("../persistencia/dalProductos");
module.exports = {
    getProductos: function (id) {
        var productoById = dalProductos.getProductoById(id);
        if (productoById) {
            if (String(productoById._id) === id) {
                return productoById;
            }
            else {
            }
        }
        else {
            var products = dalProductos.getProductos();
            if (products.length > 0) {
                return products;
            }
            else {
                return '';
            }
        }
    }
};
