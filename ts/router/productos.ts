import express from "express";
const ControladorProductos = require('../controlador/productos');

const routes = express.Router();


class RouterProductos {
    private controladorProductos: typeof ControladorProductos;
    constructor() {
        this.controladorProductos = new ControladorProductos();
    }
    
    start() {
        routes.get("/vista-test/", this.controladorProductos.getVistaTest);
        routes.get("/listar/:id?", this.controladorProductos.getProductos);
        routes.post("/agregar", this.controladorProductos.postProducto);
        routes.put("/actualizar/:id", this.controladorProductos.putProducto);
        routes.delete("/borrar/:id", this.controladorProductos.deleteProducto);
        return routes;
    }
}

module.exports = RouterProductos;