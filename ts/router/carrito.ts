import express from "express";
const ControladorCarrito = require('../controlador/carrito');

const routes = express.Router();


class RouterCarrito {

    controladorCarrito : typeof ControladorCarrito;

    constructor() {
        this.controladorCarrito = new ControladorCarrito();
    }

    start() {
        routes.get("/listar/:id?", this.controladorCarrito.getCarrito);
        routes.post("/agregar", this.controladorCarrito.postCarrito);
        routes.post("/agregar/:id_producto", this.controladorCarrito.postProductoInCarrito);
        routes.delete("/borrar/:id", this.controladorCarrito.deleteCarrito);
        return routes;
    }
}

module.exports = RouterCarrito;



