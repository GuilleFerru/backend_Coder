import { buildSchema } from "graphql";
import { dao } from "../server";

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
    productos: dao.getProductos,
    insertProducto: dao.insertProducto

};

module.exports = {
    schema,
    root
};