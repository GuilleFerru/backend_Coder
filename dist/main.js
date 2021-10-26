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
var SocketIO = __importStar(require("socket.io"));
var server_1 = require("./server");
var productoAPI_1 = require("./productoAPI");
var carritoAPI_1 = require("./carritoAPI");
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
var loginUserAPI_1 = require("./loginUserAPI");
///////////////////////////////////////////////////////////////////////////////////////////////////
server_1.server;
///////////////////////////////////////////////////////////////////////////////////////////////////
/* cliente */ /////////////////////////////////////////////////////////////////////////////////
server_1.app.use(express_1.default.static("./public"));
// app.get("/login", (_: Request, res: Response) => {
//     return res.sendFile("index.html", { root: __dirname });
// });
exports.dao = new MongoDbaaSDao_1.MongoDbaaSDao();
exports.isAdmin = true;
exports.io = new SocketIO.Server(server_1.server);
// console.log( loginOk());
(0, loginUserAPI_1.loginAPI)();
// sockets();
(0, productoAPI_1.productoAPI)();
(0, carritoAPI_1.carritoAPI)();
