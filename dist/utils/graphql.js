"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var server_1 = require("../server");
var schema = (0, graphql_1.buildSchema)("\ntype Query {\n    productos: [Producto]\n},\ntype Mutation {\n    insertProducto(title: String!, description: String!, code: String!, thumbnail: String!, price: Float!,stock: Int!): Producto\n},\ntype Producto {\n    title: String,\n    description: String,\n    code: String,\n    thumbnail: String,\n    price: Float,\n    stock: Int,\n}\n");
var root = {
    productos: server_1.dao.getProductos,
    insertProducto: server_1.dao.insertProducto
};
module.exports = {
    schema: schema,
    root: root
};
