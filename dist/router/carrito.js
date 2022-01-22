"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ControladorCarrito = require('../controlador/carrito');
var routes = express_1.default.Router();
var RouterCarrito = /** @class */ (function () {
    function RouterCarrito() {
        this.controladorCarrito = new ControladorCarrito();
    }
    RouterCarrito.prototype.start = function () {
        routes.get("/listar/:id?", this.controladorCarrito.getCarrito);
        routes.post("/agregar", this.controladorCarrito.postCarrito);
        routes.post("/agregar/:id_producto", this.controladorCarrito.postProductoInCarrito);
        routes.delete("/borrar/:id", this.controladorCarrito.deleteCarrito);
        return routes;
    };
    return RouterCarrito;
}());
module.exports = RouterCarrito;
