"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controladorCarrito = require('../controlador/controladorCarrito');
var routes = express_1.default.Router();
routes.get("/listar/:id?", controladorCarrito.getCarrito);
routes.post("/agregar", controladorCarrito.postCarrito);
routes.post("/agregar/:id_producto", controladorCarrito.postProductoInCarrito);
routes.delete("/borrar/:id", controladorCarrito.deleteCarrito);
module.exports = routes;
