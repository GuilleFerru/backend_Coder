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
exports.cartLogic = exports.io = exports.isAdmin = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var SocketIO = __importStar(require("socket.io"));
// import { productsFS } from "./productosFS";
// import { ProductLogic } from "./Product";
var Cart_1 = require("./Cart");
var productAPI_1 = require("./productAPI");
var cartAPI_1 = require("./cartAPI");
var sockets_1 = require("./sockets");
/* SERVER */ /////////////////////////////////////////////////////////////////////////////
exports.app = (0, express_1.default)();
var port = 8080;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
var server = exports.app.listen(port, function () {
    console.info("Servidor listo en el puerto " + port);
});
server.on("error", function (error) {
    console.error(error);
});
exports.isAdmin = true;
exports.io = new SocketIO.Server(server);
// export const productLogic = new ProductLogic();
exports.cartLogic = new Cart_1.CartLogic();
/* Mongoose  */ //////////////////////////////////////////////////////////////////////
// productsFS;
/* cliente */ /////////////////////////////////////////////////////////////////////////////////
exports.app.use(express_1.default.static("./public"));
exports.app.get("/", function (_, res) {
    return res.sendFile("index.html", { root: __dirname });
});
/* API y socket */ /////////////////////////////////////////////////////////////////////////////////
(0, sockets_1.sockets)();
(0, productAPI_1.productApi)();
(0, cartAPI_1.cartApi)();
