import { buildSchema } from "graphql";


const dalProductos = require('../persistencia/dalProductos');

const schema = buildSchema(`
type Query {
    productos: [Producto]
},
type Mutation {
    insertProducto(title: String!, description: String!, code: String!, thumbnail: String!, price: Float!,stock: Int!): Producto
},
type Producto {
    title: String,
    description: String,
    code: String,
    thumbnail: String,
    price: Float,
    stock: Int,
}
`);

const root = {
    productos: dalProductos.getProductos,
    insertProducto: dalProductos.insertProducto

};

module.exports = {
    schema,
    root
};