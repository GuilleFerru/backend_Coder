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
exports.loginAPI = void 0;
var server_1 = require("./server");
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var loggers_1 = require("./loggers");
var FACEBOOK_CLIENT_ID = process.argv[3] || '423519862624165';
var FACEBOOK_CLIENT_SECRET = process.argv[4] || 'de42abdb2f8e3917e10682d189668d1f';
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    // scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
    var userProfile = profile;
    return done(null, userProfile);
}));
passport_1.default.serializeUser(function (user, done) { return done(null, user); });
passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
server_1.app.use((0, cookie_parser_1.default)());
server_1.app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 600
    }
}));
server_1.app.use(passport_1.default.initialize());
server_1.app.use(passport_1.default.session());
var loginAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        server_1.app.get('/login', function (req, res) {
            if (req.isAuthenticated()) {
                loggers_1.loggerWarn.warn(req.user.displayName, ' se ha logueado');
                res.render("home", {
                    nombre: req.user.displayName,
                    img: req.user.photos[0].value,
                    // email: req.user.emails[0].value,
                });
            }
            else {
                res.render("login", {
                    title: 'Sign In'
                });
            }
        });
        server_1.app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
        server_1.app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/faillogin'
        }));
        server_1.app.get('/home', function (req, res) {
            res.redirect('/');
        });
        server_1.app.get('/faillogin', function (_, res) {
            res.render('error', {
                btnAction: '/login',
                errorText: 'No se pudo loguear desde su cuenta de Facebook, revise sus credenciales.'
            });
        });
        server_1.app.get('/logout', function (req, res) {
            try {
                var nombre_1 = req.user.displayName;
                res.render("logout", { nombre: nombre_1 });
                req.session.destroy(function () {
                    loggers_1.loggerWarn.warn(nombre_1, ' se ha deslogueado');
                });
            }
            catch (err) {
                res.render("login", {
                    title: 'Sign In'
                });
            }
            finally {
                req.logout();
            }
        });
        return [2 /*return*/];
    });
}); };
exports.loginAPI = loginAPI;
