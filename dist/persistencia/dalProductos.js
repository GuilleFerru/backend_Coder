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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var loggers_1 = require("../loggers");
var productos_1 = require("../models/productos");
var productos = [];
module.exports = {
    getProductoById: function (id) {
        return productos.find(function (element) { return String(element._id) === id; });
    },
    getProductos: function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedProducts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        productos.splice(0, productos.length);
                        return [4 /*yield*/, productos_1.productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        savedProducts = _a.sent();
                        savedProducts.forEach(function (producto) {
                            productos.push(producto);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        loggers_1.loggerError.error(error_1);
                        throw error_1;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, productos];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    filterProducto: function (filtro, filterBy) {
        return __awaiter(this, void 0, void 0, function () {
            var filtroCapitalized, productosByName, productosByCode, productosByPrecio, productosByStock, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 11]);
                        this.productos = [];
                        if (!(filterBy === 'nombre')) return [3 /*break*/, 2];
                        filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
                        return [4 /*yield*/, productos_1.productoModel.find({ $or: [{ 'title': String(filtro[0]) }, { 'title': String(filtroCapitalized) }] })];
                    case 1:
                        productosByName = _a.sent();
                        productosByName.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(filterBy === 'codigo')) return [3 /*break*/, 4];
                        return [4 /*yield*/, productos_1.productoModel.find({ 'code': String(filtro[0]) })];
                    case 3:
                        productosByCode = _a.sent();
                        productosByCode.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(filterBy === 'precio')) return [3 /*break*/, 6];
                        return [4 /*yield*/, productos_1.productoModel.find({ 'price': { $gte: filtro[0], $lte: filtro[1] } })];
                    case 5:
                        productosByPrecio = _a.sent();
                        productosByPrecio.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(filterBy === 'stock')) return [3 /*break*/, 8];
                        return [4 /*yield*/, productos_1.productoModel.find({ 'stock': { $gte: filtro[0], $lte: filtro[1] } })];
                    case 7:
                        productosByStock = _a.sent();
                        productosByStock.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_2 = _a.sent();
                        loggers_1.loggerError.error(error_2);
                        throw error_2;
                    case 10: return [2 /*return*/, this.productos];
                    case 11: return [2 /*return*/];
                }
            });
        });
    },
    insertProducto: function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, timestamp, productoMoficado, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        _id = producto._id, timestamp = producto.timestamp, productoMoficado = __rest(producto, ["_id", "timestamp"]);
                        return [4 /*yield*/, productos_1.productoModel.insertMany(productoMoficado)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_3 = _a.sent();
                        loggers_1.loggerError.error(error_3);
                        throw error_3;
                    case 3:
                        // await mongoose.disconnect();
                        loggers_1.loggerInfo.info('Producto Agregado');
                        return [2 /*return*/, producto];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    updateProducto: function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, productos_1.productoModel.updateOne({ _id: id }, {
                                $set: {
                                    title: productoToBeUpdate.title,
                                    description: productoToBeUpdate.description,
                                    code: productoToBeUpdate.code,
                                    thumbnail: productoToBeUpdate.thumbnail,
                                    price: productoToBeUpdate.price,
                                    stock: productoToBeUpdate.stock
                                }
                            }, { multi: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductos()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        loggers_1.loggerError.error(error_4);
                        throw error_4;
                    case 4:
                        loggers_1.loggerInfo.info('Producto modificado', productoToBeUpdate.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    deleteProducto: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, productos_1.productoModel.deleteMany({ _id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductos()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        loggers_1.loggerError.error(error_5);
                        throw error_5;
                    case 4:
                        loggers_1.loggerInfo.info('Producto Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
