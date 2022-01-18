"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var app_1 = require("../app");
var app_2 = require("../app");
var twilioWsp = __importStar(require("../twilio/wsp.js"));
var twilioSms = __importStar(require("../twilio/sms.js"));
var ethereal = __importStar(require("../email/nodemailerEthereal"));
var loggers_1 = require("../loggers");
var negocioProductos = require("../negocio/negocioProductos");
module.exports = {
    getCarrito: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var carritoById, carrito;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_2.dao.getCarritoById(id)];
                case 1:
                    carritoById = _a.sent();
                    if (!carritoById) return [3 /*break*/, 2];
                    if (String(carritoById._id) === id) {
                        return [2 /*return*/, carritoById];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, app_2.dao.getCarrito()];
                case 3:
                    carrito = _a.sent();
                    if (carrito.length > 0) {
                        return [2 /*return*/, carrito];
                    }
                    else {
                        return [2 /*return*/, ''];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); },
    postCarrito: function (orderToProcess) { return __awaiter(void 0, void 0, void 0, function () {
        var orderProcessed, orderProcessedId, orderProcessedDate, orderProcessedTotal, orderProcessedAdmin, orderProcessedClient, nombreAndEmail, mensajeWsp, mensajeSms, mensajeMail, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_2.dao.insertOrder(orderToProcess)];
                case 1:
                    orderProcessed = _a.sent();
                    orderProcessedId = orderProcessed[0]._id;
                    orderProcessedDate = orderProcessed[0].fyh;
                    orderProcessedTotal = orderProcessed[0].orderTotal;
                    orderProcessedAdmin = orderProcessed[0].adminOrder;
                    orderProcessedClient = orderProcessed[0].clientOrder;
                    nombreAndEmail = app_1.newSession.getNombre() + " - " + app_1.newSession.getEmail();
                    mensajeWsp = "---- " + orderProcessedDate + " Nuevo pedido de: " + nombreAndEmail + "  ---- N\u00FAmero de Orden: " + orderProcessedId + "  --- Pedido: " + JSON.stringify(orderProcessedAdmin, null, '\t') + "  ----  Precio Total $: " + orderProcessedTotal + "  ---";
                    mensajeSms = "---- " + orderProcessedDate + " N\u00FAmero de Orden: " + orderProcessedId + " ---- Orden solicitada: " + JSON.stringify(orderProcessedClient, null, '\t') + " ----  Precio Total $: " + orderProcessedTotal + "  ---";
                    mensajeMail = "---- " + orderProcessedDate + " N\u00FAmero de Orden: " + orderProcessedId + " ---- Orden solicitada: <br> " + JSON.stringify(orderProcessedAdmin, null, '<br>') + " <br> ----  Precio Total $: " + orderProcessedTotal + "  ---";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, twilioWsp.enviarWsp(mensajeWsp)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, twilioSms.enviarSMS(mensajeSms, app_1.newSession.getPhone())];
                case 4:
                    _a.sent();
                    ethereal.enviarMail("Nuevo pedido de: " + nombreAndEmail, mensajeMail, function (err, _info) {
                        if (err)
                            loggers_1.loggerError.error(err);
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    loggers_1.loggerError.error('ERROR enviarWapp', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, orderProcessedId];
            }
        });
    }); },
    deleteCarrito: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var cartToBeDelete, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, app_2.dao.getCarritoById(id)];
                case 1:
                    cartToBeDelete = _d.sent();
                    if (!cartToBeDelete) return [3 /*break*/, 5];
                    return [4 /*yield*/, app_2.dao.deleteCarrito(cartToBeDelete._id)];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, negocioProductos.restoreStock(cartToBeDelete.producto, cartToBeDelete.quantity)];
                case 3:
                    _d.sent();
                    _b = (_a = app_1.io.sockets).emit;
                    _c = ["carts"];
                    return [4 /*yield*/, app_2.dao.getCarrito()];
                case 4:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/, true];
                case 5: return [2 /*return*/, false];
            }
        });
    }); },
    postProductoInCarrito: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var productoById, stock, carrrito, cartToBeUpdate, producto, carritoWithProductoStockUpdated, producto, producto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_2.dao.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (!productoById) return [3 /*break*/, 15];
                    stock = productoById.stock;
                    if (!(stock > 0)) return [3 /*break*/, 14];
                    return [4 /*yield*/, app_2.dao.getCarrito()];
                case 2:
                    carrrito = _a.sent();
                    if (!(carrrito.length > 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, carrrito.find(function (cart) { var _a; return String((_a = cart.producto) === null || _a === void 0 ? void 0 : _a._id) === id; })];
                case 3:
                    cartToBeUpdate = _a.sent();
                    if (!cartToBeUpdate) return [3 /*break*/, 6];
                    return [4 /*yield*/, negocioProductos.updateStock(productoById)];
                case 4:
                    producto = _a.sent();
                    carritoWithProductoStockUpdated = __assign(__assign({}, cartToBeUpdate), { producto: producto });
                    return [4 /*yield*/, app_2.dao.updateQtyInCarrito(carritoWithProductoStockUpdated)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, negocioProductos.updateStock(productoById)];
                case 7:
                    producto = _a.sent();
                    return [4 /*yield*/, app_2.dao.insertProductToCarrito(producto)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 13];
                case 10: return [4 /*yield*/, negocioProductos.updateStock(productoById)];
                case 11:
                    producto = _a.sent();
                    return [4 /*yield*/, app_2.dao.insertProductToCarrito(producto)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [2 /*return*/, true];
                case 14: return [3 /*break*/, 16];
                case 15: return [2 /*return*/, false];
                case 16: return [2 /*return*/];
            }
        });
    }); }
};
