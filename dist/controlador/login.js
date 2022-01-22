"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var passport_local_1 = require("passport-local");
var usuarios_1 = require("../model/models/usuarios");
var multer_1 = __importDefault(require("multer"));
var app_1 = require("../app");
var ApiLogin = require("../api/login");
var loginStrategyName = 'login';
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    usuarios_1.usuarioModel.findById(id, function (err, user) {
        done(err, user);
    });
});
app_1.app.use((0, cookie_parser_1.default)());
app_1.app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 3600
    }
}));
app_1.app.use(passport_1.default.initialize());
app_1.app.use(passport_1.default.session());
var userSession;
var ControladorLogin = /** @class */ (function () {
    function ControladorLogin() {
        var _this = this;
        this.loginStrategyName = function () {
            passport_1.default.use(loginStrategyName, new passport_local_1.Strategy({
                passReqToCallback: true
            }, function (_, username, password, done) {
                _this.apiLogin.findUser(_, username, password, done);
            }));
            return loginStrategyName;
        };
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (_req, file, callback) {
                    callback(null, "./public/img/userAvatar");
                },
                filename: function (_req, file, callback) {
                    callback(null, Date.now() + "-" + file.originalname);
                },
            }),
        });
        this.getLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!req.isAuthenticated()) return [3 /*break*/, 1];
                        res.render("login", {
                            enctype: 'application/x-www-form-urlencoded',
                            formAction: "/login",
                            title: 'Sign In',
                            btnPrimaryTitle: 'SIGN IN',
                            btnSecondaryTitle: 'SIGN UP',
                            btnSecondaryAction: '/register'
                        });
                        return [3 /*break*/, 3];
                    case 1:
                        user = req.user;
                        return [4 /*yield*/, this.apiLogin.getLogin(user)];
                    case 2:
                        userSession = _a.sent();
                        if (!userSession) {
                            res.status(404).json({ error: "Hubo un problema con la sesion del usuario" });
                        }
                        else {
                            res.render("home", {
                                email: userSession.email,
                                nombre: userSession.nombre,
                                img: userSession.avatar
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postLogin = function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.redirect('/');
                return [2 /*return*/];
            });
        }); };
        this.getFailLogin = function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('error', {
                    btnAction: '/login',
                    errorText: 'Compruebe que el Usuario y/o la contraseña sean correctas.'
                });
                return [2 /*return*/];
            });
        }); };
        this.getLogout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var nombre_1;
            return __generator(this, function (_a) {
                try {
                    nombre_1 = userSession.nombre;
                    req.logout();
                    req.session.destroy(function () {
                        res.render("logout", { nombre: nombre_1 });
                    });
                }
                catch (err) {
                    res.render("logout", { nombre: '' });
                }
                return [2 /*return*/];
            });
        }); };
        this.getRegister = function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("login", {
                    enctype: 'multipart/form-data',
                    signup: true,
                    formAction: "/register",
                    title: 'Sign Up',
                    btnPrimaryTitle: 'SIGN UP',
                    btnSecondaryTitle: 'SIGN IN',
                    btnSecondaryAction: '/login'
                });
                return [2 /*return*/];
            });
        }); };
        this.postRegister = function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.redirect('/');
                return [2 /*return*/];
            });
        }); };
        this.getFailRegister = function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('error', {
                    btnAction: '/register',
                    errorText: 'El nombre de Usuario que intenta registrar ya ha sido utilizado, por favor seleccione un nombre distinto.'
                });
                return [2 /*return*/];
            });
        }); };
        this.apiLogin = new ApiLogin();
    }
    return ControladorLogin;
}());
module.exports = ControladorLogin;
