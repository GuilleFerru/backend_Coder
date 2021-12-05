"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var controladorLogin = require('../controlador/controladorLogin');
var routes = express_1.default.Router();
routes.get('/login', controladorLogin.getLogin);
routes.post('/login', passport_1.default.authenticate(controladorLogin.loginStrategyName(), { failureRedirect: '/faillogin' }), controladorLogin.postLogin);
routes.get('/faillogin', controladorLogin.getFailLogin);
routes.get('/logout', controladorLogin.getLogout);
module.exports = routes;
