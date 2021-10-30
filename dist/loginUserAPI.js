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
var loginAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        server_1.app.post('/loadData', function (req, res) {
            var userName = req.body.userName;
            if (userName) {
                req.session.nombre = userName;
                console.log('loadData ok', req.session.nombre);
                return res.status(200).json({ userName: userName, dataOk: true });
            }
            else {
                return res.status(200).json({ data: undefined });
            }
        });
        server_1.app.get('/sockets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.session.nombre) {
                    // await sockets();
                    console.log('hola');
                    return [2 /*return*/, res.status(200).send('OK')];
                }
                else {
                    res.status(200).json({ userName: undefined });
                }
                return [2 /*return*/];
            });
        }); });
        server_1.app.get('/login', function (req, res) {
            if (req.session.nombre) {
                res.status(200).json({ userName: "" + req.session.nombre });
            }
            else {
                res.status(200).json({ userName: undefined });
            }
        });
        server_1.app.post('/login', function (req, res) {
            var userOk = req.body.userName;
            if (userOk !== '') {
                return res.redirect(307, '/loadData');
                // res.status(200).json({ userName: `${req.session.nombre}` });
            }
            else {
                return res.redirect(302, '/');
                // req.session.nombre = undefined;
                // res.status(200).json({ userName: undefined });
            }
        });
        server_1.app.get('/logout', function (req, res) {
            var nombre = req.session.nombre;
            if (nombre) {
                req.session.destroy(function (err) {
                    console.log('destroy');
                    if (!err) {
                        res.status(200).json({ userName: "" + nombre });
                    }
                });
            }
            else {
                res.status(200).json({ userName: undefined });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.loginAPI = loginAPI;
