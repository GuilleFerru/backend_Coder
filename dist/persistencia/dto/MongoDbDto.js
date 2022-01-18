"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productoDTO = function (producto) { return ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
module.exports = {
    productoDTO: productoDTO,
};
