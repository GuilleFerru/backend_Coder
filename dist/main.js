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
exports.io = exports.isAdmin = exports.dao = void 0;
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var server_1 = require("./server");
var productoAPI_1 = require("./productoAPI");
var carritoAPI_1 = require("./carritoAPI");
var sockets_1 = require("./sockets");
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
var loginUserAPI_1 = require("./loginUserAPI");
var processAPI_1 = require("./processAPI");
var loggers_1 = require("./loggers");
///////////////////////////////////////////////////////////////////////////////////////////////////
server_1.server;
///////////////////////////////////////////////////////////////////////////////////////////////////
//Configuración de handlebars
server_1.app.engine("hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
}));
server_1.app.set("view engine", "hbs");
server_1.app.set("views", "./views");
server_1.app.use(express_1.default.static('public'));
exports.dao = new MongoDbaaSDao_1.MongoDbaaSDao();
exports.isAdmin = true;
exports.io = new SocketIO.Server(server_1.server);
(0, loginUserAPI_1.loginAPI)();
(0, sockets_1.sockets)();
(0, productoAPI_1.productoAPI)();
(0, carritoAPI_1.carritoAPI)();
(0, processAPI_1.processAPI)();
process.on('exit', function (code) { return loggers_1.loggerInfo.info("exit " + code); });
