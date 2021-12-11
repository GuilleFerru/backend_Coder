import express from "express";
const controladorCarrito = require('../controlador/controladorCarrito');

const routes = express.Router();

routes.get("/listar/:id?", controladorCarrito.getCarrito);
routes.post("/agregar", controladorCarrito.postCarrito);
routes.post("/agregar/:id_producto", controladorCarrito.postProductoInCarrito);
routes.delete("/borrar/:id", controladorCarrito.deleteCarrito);


module.exports = routes;