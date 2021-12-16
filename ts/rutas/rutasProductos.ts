import express from "express";

const controladorProductos = require('../controlador/controladorProductos');

const routes = express.Router();


routes.get("/vista-test/", controladorProductos.getVistaTest);
routes.get("/listar/:id?", controladorProductos.getProductos);
routes.post("/agregar", controladorProductos.postProducto);
routes.put("/actualizar/:id", controladorProductos.putProducto);
routes.delete("/borrar/:id", controladorProductos.deleteProducto);


module.exports = routes;