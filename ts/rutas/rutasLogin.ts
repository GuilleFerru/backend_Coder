import express from "express";
import passport from "passport";


const controladorLogin = require('../controlador/controladorLogin');


const routes = express.Router();

routes.get('/login', controladorLogin.getLogin);
routes.post('/login', passport.authenticate(controladorLogin.loginStrategyName(), { failureRedirect: '/faillogin' }), controladorLogin.postLogin);

routes.get('/faillogin', controladorLogin.getFailLogin);


routes.get('/logout', controladorLogin.getLogout);


module.exports = routes;