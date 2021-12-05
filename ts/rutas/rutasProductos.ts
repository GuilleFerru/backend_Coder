import express from "express";
const controladorProductos = require('../controlador/controladorProductos');




const routes = express.Router();

routes.get("/listar/:id?", controladorProductos.getProductos);


module.exports = routes;