"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ControladorProductos = require('../controlador/productos');
var routes = express_1.default.Router();
var RouterProductos = /** @class */ (function () {
    function RouterProductos() {
        this.controladorProductos = new ControladorProductos();
    }
    RouterProductos.prototype.start = function () {
        routes.get("/vista-test/", this.controladorProductos.getVistaTest);
        routes.get("/listar/:id?", this.controladorProductos.getProductos);
        routes.post("/agregar", this.controladorProductos.postProducto);
        routes.put("/actualizar/:id", this.controladorProductos.putProducto);
        routes.delete("/borrar/:id", this.controladorProductos.deleteProducto);
        return routes;
    };
    return RouterProductos;
}());
module.exports = RouterProductos;
