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
Object.defineProperty(exports, "__esModule", { value: true });
var loggers_1 = require("../loggers");
var carrito_1 = require("../models/carrito");
var order_1 = require("../models/order");
var carrito = [];
module.exports = {
    getCarritoById: function (id) {
        return carrito.find(function (element) { return String(element._id) === id; });
    },
    getCarrito: function () {
        return __awaiter(this, void 0, void 0, function () {
            var carritosEnDB, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        carrito.splice(0, carrito.length);
                        return [4 /*yield*/, carrito_1.carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        carritosEnDB = _a.sent();
                        carritosEnDB.forEach(function (cart) {
                            carrito.push(cart);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        loggers_1.loggerError.error(error_1);
                        throw error_1;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, carrito];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    insertOrder: function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderTotal, _i, order_2, carrito_2, error_2, finalOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 8, 10]);
                        orderTotal = order.pop();
                        _i = 0, order_2 = order;
                        _a.label = 1;
                    case 1:
                        if (!(_i < order_2.length)) return [3 /*break*/, 4];
                        carrito_2 = order_2[_i];
                        return [4 /*yield*/, carrito_1.carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito_2._id }] }, { $set: { "cerrado": true } })];
                    case 2:
                        _a.sent();
                        delete carrito_2.cerrado;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, order_1.ordenModel.insertMany({
                            productos: order,
                            orderTotal: orderTotal.orderTotal
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        error_2 = _a.sent();
                        loggers_1.loggerError.error(error_2);
                        throw error_2;
                    case 8: return [4 /*yield*/, order_1.ordenModel.find({}, { productos: { _id: 0, producto: { _id: 0, description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1)];
                    case 9:
                        finalOrder = _a.sent();
                        loggers_1.loggerWarn.warn('Orden Agregada', JSON.stringify(finalOrder));
                        return [2 /*return*/, finalOrder
                            // await mongoose.disconnect();
                        ];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    insertProductToCarrito: function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, carrito_1.carritoModel.insertMany({
                                quantity: 1,
                                producto: producto
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_3 = _a.sent();
                        loggers_1.loggerError.error(error_3);
                        throw error_3;
                    case 3:
                        loggers_1.loggerInfo.info('Producto agregado a carrito', producto.title);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    updateQtyInCarrito: function (carrito) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, carrito_1.carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1 } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        loggers_1.loggerError.error(error_4);
                        throw error_4;
                    case 4:
                        loggers_1.loggerInfo.info('Se agrego un producto similar al mismo carrito', carrito.producto.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    deleteCarrito: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, carrito_1.carritoModel.deleteMany({ _id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        loggers_1.loggerError.error(error_5);
                        throw error_5;
                    case 4:
                        loggers_1.loggerInfo.info('Producto en carrito Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
