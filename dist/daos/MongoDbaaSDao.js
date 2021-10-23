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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbaaSDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var IMensaje_1 = require("../interfaces/IMensaje");
var productos_1 = require("../models/productos");
var mensajes_1 = require("../models/mensajes");
var carrito_1 = require("../models/carrito");
var order_1 = require("../models/order");
var usuarios_1 = require("../models/usuarios");
var MongoDbaaSDao = /** @class */ (function () {
    function MongoDbaaSDao() {
        this.MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.usuarioOk = false;
        this.countMensaje = 1;
        this.countOrder = 1;
        this.dbConnection = mongoose_1.default.connect(this.MONGO_URL, function () {
            console.log("Base de datos MongoDBAaS conectada!");
        });
    }
    MongoDbaaSDao.prototype.getUsuario = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var savedUsers, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, usuarios_1.usuarioModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.forEach(function (user) {
                            if (user.userName === usuario) {
                                _this.usuarioOk = true;
                            }
                            else {
                                _this.usuarioOk = false;
                            }
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, this.usuarioOk];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.filterProducto = function (filtro, filterBy) {
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
                        console.log(error_2);
                        throw error_2;
                    case 10: return [2 /*return*/, this.productos];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.insertProducto = function (producto) {
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
                        console.log(error_3);
                        throw error_3;
                    case 3:
                        // await mongoose.disconnect();
                        console.log('Producto Agregado');
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.getProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedProducts, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.productos = [];
                        return [4 /*yield*/, productos_1.productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        savedProducts = _a.sent();
                        savedProducts.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, this.productos];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDbaaSDao.prototype.getProductoById = function (id) {
        return this.productos.find(function (element) { return String(element._id) === id; });
    };
    ;
    MongoDbaaSDao.prototype.updateProducto = function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
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
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw error_5;
                    case 4:
                        console.log('Producto modificado', productoToBeUpdate.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDbaaSDao.prototype.deleteProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
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
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw error_6;
                    case 4:
                        console.log('Producto Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    ////////////////////////////////////////////////////////////////////////////////////////////
    MongoDbaaSDao.prototype.insertOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderTotal, _i, order_2, carrito, error_7, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 7, 8, 10]);
                        orderTotal = order.pop();
                        _i = 0, order_2 = order;
                        _f.label = 1;
                    case 1:
                        if (!(_i < order_2.length)) return [3 /*break*/, 4];
                        carrito = order_2[_i];
                        return [4 /*yield*/, carrito_1.carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "cerrado": true } })];
                    case 2:
                        _f.sent();
                        delete carrito.cerrado;
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, order_1.ordenModel.insertMany({
                            productos: order,
                            orderTotal: orderTotal.orderTotal
                        })];
                    case 5:
                        _f.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 6:
                        _f.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        error_7 = _f.sent();
                        console.log(error_7);
                        throw error_7;
                    case 8:
                        _b = (_a = console).log;
                        _c = ['Orden Agregada'];
                        _e = (_d = JSON).stringify;
                        return [4 /*yield*/, order_1.ordenModel.find().sort({ _id: -1 }).limit(1)];
                    case 9:
                        _b.apply(_a, _c.concat([_e.apply(_d, [_f.sent()])]));
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.insertProductToCarrito = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
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
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw error_8;
                    case 3:
                        console.log('Producto agregado a carrito', producto.title);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.getCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carritosEnDB, error_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.carrito = [];
                        return [4 /*yield*/, carrito_1.carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        carritosEnDB = _a.sent();
                        carritosEnDB.forEach(function (carrito) {
                            _this.carrito.push(carrito);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw error_9;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, this.carrito];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return String(element._id) === id; });
    };
    MongoDbaaSDao.prototype.updateQtyInCarrito = function (carrito) {
        return __awaiter(this, void 0, void 0, function () {
            var error_10;
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
                        error_10 = _a.sent();
                        console.log(error_10);
                        throw error_10;
                    case 4:
                        console.log('Se agrego un producto similar al mismo carrito', carrito.producto.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.deleteCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_11;
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
                        error_11 = _a.sent();
                        console.log(error_11);
                        throw error_11;
                    case 4:
                        console.log('Producto en carrito Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    MongoDbaaSDao.prototype.getMensajeById = function (id) {
        return this.mensajes.find(function (element) { return String(element.id) === id; });
    };
    MongoDbaaSDao.prototype.getMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedMensajes, error_12, mensajes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.mensajes = [];
                        return [4 /*yield*/, mensajes_1.mensajesModel.find({}, { __v: 0, _id: 0 })];
                    case 1:
                        savedMensajes = _a.sent();
                        savedMensajes.forEach(function (mensaje) {
                            _this.mensajes.push(mensaje);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_12 = _a.sent();
                        console.log(error_12);
                        throw error_12;
                    case 3:
                        mensajes = new IMensaje_1.MensajeWrap('999', this.mensajes);
                        return [2 /*return*/, mensajes];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbaaSDao.prototype.insertMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, mensajes_1.mensajesModel.insertMany(mensaje)];
                    case 1:
                        _a.sent();
                        this.mensajes.push(mensaje);
                        return [3 /*break*/, 4];
                    case 2:
                        error_13 = _a.sent();
                        console.log(error_13);
                        throw error_13;
                    case 3:
                        console.log('Mensaje Agregado');
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDbaaSDao;
}());
exports.MongoDbaaSDao = MongoDbaaSDao;
