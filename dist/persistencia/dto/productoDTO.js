"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoDTOForFirebase = exports.insertUpdateProductoDTOForFirebase = exports.productoDTOForMongo = exports.insertUpdateProductoDTOForMongo = exports.productoDTOForSQL = exports.insertUpdateProductoDTOForSQL = exports.productoDTOForFile = exports.insertUpdateProductoDTOForFile = exports.productoDTOForMemory = exports.insertUpdateProductoDTOForMemory = void 0;
var insertUpdateProductoDTOForMemory = function (producto, id) { return ({
    _id: id,
    fyh: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.insertUpdateProductoDTOForMemory = insertUpdateProductoDTOForMemory;
var productoDTOForMemory = function (producto) { return ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.productoDTOForMemory = productoDTOForMemory;
var insertUpdateProductoDTOForFile = function (producto, id) { return ({
    _id: id,
    fyh: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.insertUpdateProductoDTOForFile = insertUpdateProductoDTOForFile;
var productoDTOForFile = function (producto) { return ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.productoDTOForFile = productoDTOForFile;
var insertUpdateProductoDTOForSQL = function (producto) { return ({
    timestamp: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.insertUpdateProductoDTOForSQL = insertUpdateProductoDTOForSQL;
var productoDTOForSQL = function (producto) { return ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.productoDTOForSQL = productoDTOForSQL;
var insertUpdateProductoDTOForMongo = function (producto) { return ({
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.insertUpdateProductoDTOForMongo = insertUpdateProductoDTOForMongo;
var productoDTOForMongo = function (producto) { return ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.productoDTOForMongo = productoDTOForMongo;
var insertUpdateProductoDTOForFirebase = function (producto) { return ({
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
}); };
exports.insertUpdateProductoDTOForFirebase = insertUpdateProductoDTOForFirebase;
var productoDTOForFirebase = function (producto) { return ({
    _id: String(producto.id),
    title: producto.data().title,
    description: producto.data().description,
    code: producto.data().code,
    thumbnail: producto.data().thumbnail,
    price: producto.data().price,
    stock: producto.data().stock
}); };
exports.productoDTOForFirebase = productoDTOForFirebase;
