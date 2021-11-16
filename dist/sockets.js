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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = void 0;
var main_1 = require("./main");
var main_2 = require("./main");
var IMensaje_1 = require("./interfaces/IMensaje");
var normalizr = __importStar(require("normalizr"));
var getNormalizeMsj = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mensajesOriginal, mensajesOriginalToString, mensajeParse, author, post, chat, normalizePost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, main_2.dao.getMensajes()];
            case 1:
                mensajesOriginal = _a.sent();
                mensajesOriginalToString = JSON.stringify(mensajesOriginal);
                mensajeParse = JSON.parse(mensajesOriginalToString);
                author = new normalizr.schema.Entity("author", undefined, {
                    idAttribute: 'email',
                });
                post = new normalizr.schema.Entity("post", {
                    author: author,
                });
                chat = new normalizr.schema.Entity('chat', {
                    authors: [author],
                    posts: [post]
                });
                normalizePost = normalizr.normalize(mensajeParse, chat);
                return [2 /*return*/, normalizePost];
        }
    });
}); };
var generateMensajeId = function () {
    return Math.floor(Math.random() * 8 + 1) + Math.random().toString().slice(2, 10);
};
var sockets = function () { return __awaiter(void 0, void 0, void 0, function () {
    var port;
    return __generator(this, function (_a) {
        port = process.env.PORT || process.argv[2] || 8080;
        main_1.io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _b = (_a = socket).emit;
                        _c = ["messages"];
                        return [4 /*yield*/, getNormalizeMsj()];
                    case 1:
                        _b.apply(_a, _c.concat([_g.sent()]));
                        socket.emit('port', port);
                        socket.on("newMessage", function (mensaje) { return __awaiter(void 0, void 0, void 0, function () {
                            var date, id, checkId, newAuthor, newMensaje, _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        date = new Date().toLocaleString('es-AR');
                                        id = generateMensajeId();
                                        checkId = main_2.dao.getMensajeById(id);
                                        while (checkId) {
                                            id = generateMensajeId();
                                        }
                                        newAuthor = new IMensaje_1.Author(mensaje.author.email, mensaje.author.nombre, mensaje.author.apellido, mensaje.author.edad, mensaje.author.alias, mensaje.author.avatar);
                                        newMensaje = new IMensaje_1.Mensaje(id, mensaje.text, date, newAuthor);
                                        return [4 /*yield*/, main_2.dao.insertMensajes(newMensaje)];
                                    case 1:
                                        _d.sent();
                                        _b = (_a = main_1.io.sockets).emit;
                                        _c = ["messages"];
                                        return [4 /*yield*/, getNormalizeMsj()];
                                    case 2:
                                        _b.apply(_a, _c.concat([_d.sent()]));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _e = (_d = socket).emit;
                        _f = ["products"];
                        return [4 /*yield*/, main_2.dao.getProductos()];
                    case 2:
                        _e.apply(_d, _f.concat([_g.sent(), main_1.isAdmin]));
                        socket.on("filterProducto", function (filter, filterBy) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _b = (_a = socket).emit;
                                        _c = ["products"];
                                        return [4 /*yield*/, main_2.dao.filterProducto(filter, filterBy)];
                                    case 1:
                                        _b.apply(_a, _c.concat([_d.sent(), main_1.isAdmin]));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        socket.on("getAllProductos", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _b = (_a = socket).emit;
                                        _c = ["products"];
                                        return [4 /*yield*/, main_2.dao.getProductos()];
                                    case 1:
                                        _b.apply(_a, _c.concat([_d.sent()]));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.sockets = sockets;
// export const sockets = () => {
//     io.on("connection", async (socket) => {
//         socket.emit("messages", await dao.getMensajes());
//         socket.emit("products", await dao.getProductos(), isAdmin);
//         socket.on("newMessage", async (message: Mensaje) => {
//             const date = new Date().toLocaleString('es-AR');
//             const newMensaje: Mensaje = new Mensaje(
//                 message.author,
//                 date,
//                 message.text
//             )
//             await dao.insertMensajes(newMensaje);
//             io.sockets.emit("messages", await dao.getMensajes());
//         });
//         socket.on("filterProducto", async (filter: string[], filterBy: string) => {
//             socket.emit("products", await dao.filterProducto(filter, filterBy), isAdmin);
//         });
//         socket.on("getAllProductos", async () => {
//             socket.emit("products", await dao.getProductos());
//         });
//     });
// }
