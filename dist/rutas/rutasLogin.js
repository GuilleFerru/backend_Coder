"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var bcrypt_1 = __importDefault(require("bcrypt"));
var loggers_1 = require("../loggers");
var usuarios_1 = require("../models/usuarios");
var ethereal = __importStar(require("../email/nodemailerEthereal"));
var controladorLogin = require('../controlador/controladorLogin');
var negocioLogin = require('../negocio/negocioLogin');
var signUpStrategyName = 'signup';
var createHash = function (password) { return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10)); };
passport_1.default.use(signUpStrategyName, new passport_local_1.Strategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    var findOrCreateUser = function () {
        // find a user in Mongo with provided username
        usuarios_1.usuarioModel.findOne({ 'username': username }, function (err, user) {
            var _a;
            // In case of any error return
            if (err) {
                loggers_1.loggerError.info('Error in SignUp: ' + err);
                return done(err);
            }
            // already exists
            if (user) {
                loggers_1.loggerInfo.info('User already exists');
                loggers_1.loggerInfo.info('message', 'User Already Exists');
                return done(null, false);
            }
            else {
                // if there is no user with that email
                // create the user
                var newUser = new usuarios_1.usuarioModel();
                // set the user's local credentials  
                newUser.username = username;
                newUser.name = req.body.name;
                newUser.lastname = req.body.lastname;
                newUser.address = req.body.address;
                newUser.age = req.body.age;
                newUser.phone = req.body.phone;
                newUser.avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replace('public', '');
                newUser.password = createHash(password);
                newUser.isAdmin = false;
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        loggers_1.loggerInfo.info('Error in Saving user: ' + err);
                        throw err;
                    }
                    loggers_1.loggerInfo.info('User Registration succesful');
                    var asunto = "nuevo registro";
                    var mensaje = "Se ha creado el siguiente usuario: \n                    Nombre de Usuario: " + newUser.username + ", <br> \n                    Nombre: " + newUser.name + ", <br>\n                    Apellido: " + newUser.lastname + ", <br>\n                    Direcci\u00F3n: " + newUser.address + ", <br>\n                    Edad: " + newUser.age + ", <br>\n                    Telefono: " + newUser.phone + ", <br>\n                    URL del avatar: " + newUser.avatar + ",<br>\n                    Password encriptado: " + newUser.password + ". <br>\n                    Es administrador: " + newUser.isAdmin + ". <br>\n                    ";
                    ethereal.enviarMail(asunto, mensaje, function (err, info) {
                        if (err)
                            loggers_1.loggerError.error(err);
                        else
                            loggers_1.loggerWarn.warn(info);
                    });
                    return done(null, newUser);
                });
            }
        });
    };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    usuarios_1.usuarioModel.findById(id, function (err, user) {
        done(err, user);
    });
});
var routes = express_1.default.Router();
routes.get('/login', controladorLogin.getLogin);
routes.post('/login', passport_1.default.authenticate(controladorLogin.loginStrategyName(), { failureRedirect: '/faillogin' }), controladorLogin.postLogin);
routes.get('/faillogin', controladorLogin.getFailLogin);
routes.get('/logout', controladorLogin.getLogout);
routes.get('/register', controladorLogin.getRegister);
routes.post('/register', controladorLogin.upload.single("avatar"), passport_1.default.authenticate(signUpStrategyName, { failureRedirect: '/failregister' }), controladorLogin.postRegister);
routes.get('/failregister', controladorLogin.getFailRegister);
module.exports = routes;
