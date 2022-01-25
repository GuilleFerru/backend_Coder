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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = void 0;
var server_1 = require("./server");
var mongodb_1 = require("mongodb");
var MensajeRepository_1 = __importDefault(require("./repositories/MensajeRepository"));
var IMensaje_1 = require("./model/DAOs/interfaces/IMensaje");
var loggers_1 = require("./utils/loggers");
var normalizr = __importStar(require("normalizr"));
var twilio = __importStar(require("./twilio/sms.js"));
var MensajeDto_1 = require("./model/DTOs/MensajeDto");
var minimist_1 = __importDefault(require("minimist"));
var config = require('../config.js');
var minimistArgs = (0, minimist_1.default)(process.argv.slice(2), {
    default: {
        port: 8080,
    }
});
var port = minimistArgs.port;
console.log(port);
//normaliza el mensaje
var getNormalizeMsj = function (mensajeRepository) { return __awaiter(void 0, void 0, void 0, function () {
    var mensajesOriginal, mensajeDTO, mensajesOriginalToString, mensajeParse, author, post, chat, normalizePost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (mensajeRepository === null || mensajeRepository === void 0 ? void 0 : mensajeRepository.find())];
            case 1:
                mensajesOriginal = _a.sent();
                mensajeDTO = (0, MensajeDto_1.MensajeDTO)(mensajesOriginal);
                mensajesOriginalToString = JSON.stringify(mensajeDTO);
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
            case 2:
                error_1 = _a.sent();
                loggers_1.loggerError.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var generateMensajeId = function () {
    var hexa = __spreadArray([], Array(24), true).map(function () { return Math.floor(Math.random() * 16).toString(16); }).join('');
    return String(hexa);
};
var sockets = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, mensajeRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(config.MONGO_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })];
            case 1:
                connection = _a.sent();
                mensajeRepository = new MensajeRepository_1.default(connection.db("ecommerce"), "mensajesnormalizrs");
                loggers_1.loggerInfo.info("Conectado a la base de datos de mensajes");
                server_1.io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                //envia el mensaje normalizado al cliente
                                _b = (_a = socket).emit;
                                _c = ["messages"];
                                return [4 /*yield*/, getNormalizeMsj(mensajeRepository)];
                            case 1:
                                //envia el mensaje normalizado al cliente
                                _b.apply(_a, _c.concat([_g.sent()]));
                                //emito el puerto
                                // socket.emit('port', port)
                                //recibo el mensaje, lo guardo y busco la palabra admin en el mensaje para enviar un sms al adminsitrador
                                socket.on("newMessage", function (mensaje) { return __awaiter(void 0, void 0, void 0, function () {
                                    var date, id, checkId, newAuthor, newMensaje, msj, error_2, _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                date = new Date().toLocaleString('es-AR');
                                                id = generateMensajeId();
                                                return [4 /*yield*/, mensajeRepository.findOne(id)];
                                            case 1:
                                                checkId = _d.sent();
                                                while (checkId) {
                                                    id = generateMensajeId();
                                                }
                                                newAuthor = new IMensaje_1.Author(mensaje.author.email, mensaje.author.nombre, mensaje.author.apellido, mensaje.author.edad, mensaje.author.alias, mensaje.author.avatar);
                                                newMensaje = new IMensaje_1.Mensaje(id, mensaje.text, date, newAuthor);
                                                return [4 /*yield*/, mensajeRepository.create(newMensaje)];
                                            case 2:
                                                _d.sent();
                                                if (!mensaje.text.includes('administrador')) return [3 /*break*/, 6];
                                                _d.label = 3;
                                            case 3:
                                                _d.trys.push([3, 5, , 6]);
                                                msj = "El usuario " + mensaje.author.email + " te envio el siguiente mensaje: " + mensaje.text;
                                                return [4 /*yield*/, twilio.enviarSMS(msj, config.TWILIO_PHONE_NUMBER)];
                                            case 4:
                                                _d.sent();
                                                return [3 /*break*/, 6];
                                            case 5:
                                                error_2 = _d.sent();
                                                loggers_1.loggerError.error('ERROR enviarWapp', error_2);
                                                return [3 /*break*/, 6];
                                            case 6:
                                                _b = (_a = server_1.io.sockets).emit;
                                                _c = ["messages"];
                                                return [4 /*yield*/, getNormalizeMsj(mensajeRepository)];
                                            case 7:
                                                _b.apply(_a, _c.concat([_d.sent()]));
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                //devuelve todos los productos
                                _e = (_d = socket).emit;
                                _f = ["products"];
                                return [4 /*yield*/, server_1.dao.getProductos()];
                            case 2:
                                //devuelve todos los productos
                                _e.apply(_d, _f.concat([_g.sent(), server_1.newSession.getIsAdmin()]));
                                //recibe el string a buscar y el tipo de busqueda, devuelve un array con los productos que coinciden con la busqueda
                                socket.on("filterProducto", function (filter, filterBy) { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                _b = (_a = socket).emit;
                                                _c = ["products"];
                                                return [4 /*yield*/, server_1.dao.filterProducto(filter, filterBy)];
                                            case 1:
                                                _b.apply(_a, _c.concat([_d.sent(), server_1.newSession.getIsAdmin()]));
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                //devuelve todos los productos solicitados por el cliente
                                socket.on("getAllProductos", function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                _b = (_a = socket).emit;
                                                _c = ["products"];
                                                return [4 /*yield*/, server_1.dao.getProductos()];
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
        }
    });
}); };
exports.sockets = sockets;
