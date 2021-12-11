"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controladorProductos = require('../controlador/controladorProductos');
var routes = express_1.default.Router();
routes.get("/vista-test/", controladorProductos.getVistaTest);
routes.get("/listar/:id?", controladorProductos.getProductos);
routes.post("/agregar", controladorProductos.postProducto);
routes.put("/actualizar/:id", controladorProductos.putProducto);
routes.delete("/borrar/:id", controladorProductos.deleteProducto);
module.exports = routes;
