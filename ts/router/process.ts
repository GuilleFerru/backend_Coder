import express from "express";

const ControladorProcess = require('../controlador/process');

const routes = express.Router();

class RouterProcess {

    private controladorProcess: typeof ControladorProcess;
    constructor() {
        this.controladorProcess = new ControladorProcess();
    }

    start() {
        routes.get("/info", this.controladorProcess.getInfo);
        routes.get('/randoms', this.controladorProcess.getRandoms);
        return routes;
    }
}

module.exports = RouterProcess;