"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ControladorProcess = require('../controlador/process');
var routes = express_1.default.Router();
var RouterProcess = /** @class */ (function () {
    function RouterProcess() {
        this.controladorProcess = new ControladorProcess();
    }
    RouterProcess.prototype.start = function () {
        routes.get("/info", this.controladorProcess.getInfo);
        routes.get('/randoms', this.controladorProcess.getRandoms);
        return routes;
    };
    return RouterProcess;
}());
module.exports = RouterProcess;
