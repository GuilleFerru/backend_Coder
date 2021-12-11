import express from "express";
const controladorProcess = require('../controlador/controladorProcess');

const routes = express.Router();

routes.get("/info", controladorProcess.getInfo);
routes.get('/randoms', controladorProcess.getRandoms);

module.exports = routes;