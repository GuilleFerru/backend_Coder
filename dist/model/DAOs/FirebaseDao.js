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
exports.FirebaseDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ICart_1 = require("./interfaces/ICart");
var usuarios_1 = require("../models/usuarios");
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var loggers_1 = require("../../utils/loggers");
var ProductoDto_1 = require("../DTOs/ProductoDto");
var OrdenDto_1 = require("../DTOs/OrdenDto");
var config = require('../../../config.js');
if (config.PERSISTENCIA === '7') {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(config.FIREBASE_CREDENTIAL),
        databaseURL: config.FIREBASE_URL,
    });
    loggers_1.loggerInfo.info("Base de datos Firebase conectada!");
}
var FirebaseDao = /** @class */ (function () {
    function FirebaseDao() {
        this.firestoreAdmin = firebase_admin_1.default.firestore();
        this.MONGO_URL = config.MONGO_URL;
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.dbConnection = this.conectar();
    }
    FirebaseDao.prototype.conectar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loggers_1.loggerInfo.info('Base de datos MongoDBAaS para USER PASSPORT conectada');
                        return [4 /*yield*/, mongoose_1.default.connect(this.MONGO_URL)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        loggers_1.loggerError.error("MongoDB: Error en conectar: " + err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.findUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuarios_1.usuarioModel.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    FirebaseDao.prototype.Collection = function (collection) {
        return this.firestoreAdmin.collection(collection);
    };
    FirebaseDao.prototype.filterProducto = function (filtro, filterBy) {
        return __awaiter(this, void 0, void 0, function () {
            var productosByName, productosByCode, productosByPrecio, productosByStock, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 11]);
                        this.productos = [];
                        if (!(filterBy === 'nombre')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Collection('productos').where('title', '==', filtro[0]).get()];
                    case 1:
                        productosByName = _a.sent();
                        productosByName.forEach(function (producto) {
                            var filterProducto = (0, ProductoDto_1.productoDTOForFirebase)(producto);
                            _this.productos.push(filterProducto);
                        });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(filterBy === 'codigo')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.Collection('productos').where('code', '==', filtro[0]).get()];
                    case 3:
                        productosByCode = _a.sent();
                        productosByCode.forEach(function (producto) {
                            var filterProducto = (0, ProductoDto_1.productoDTOForFirebase)(producto);
                            _this.productos.push(filterProducto);
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(filterBy === 'precio')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.Collection('productos').orderBy('price').startAt(filtro[0]).endAt(filtro[1]).get()];
                    case 5:
                        productosByPrecio = _a.sent();
                        productosByPrecio.forEach(function (producto) {
                            var filterProducto = (0, ProductoDto_1.productoDTOForFirebase)(producto);
                            _this.productos.push(filterProducto);
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(filterBy === 'stock')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.Collection('productos').orderBy('stock').startAt(filtro[0]).endAt(filtro[1]).get()];
                    case 7:
                        productosByStock = _a.sent();
                        productosByStock.forEach(function (producto) {
                            var filterProducto = (0, ProductoDto_1.productoDTOForFirebase)(producto);
                            _this.productos.push(filterProducto);
                        });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 10: return [2 /*return*/, this.productos];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.insertProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, this.Collection('productos').add((0, ProductoDto_1.insertUpdateProductoDTOForFirebase)(producto))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 3:
                        console.log('Producto Agregado');
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.getProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedProducts, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.productos = [];
                        return [4 /*yield*/, this.Collection('productos').get()];
                    case 1:
                        savedProducts = _a.sent();
                        savedProducts.docs.map(function (producto) {
                            _this.productos.push((0, ProductoDto_1.productoDTOForFirebase)(producto));
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw error_3;
                    case 3: return [2 /*return*/, this.productos];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.getProductoById = function (id) {
        return this.productos.find(function (element) { return String(element._id) === id; });
    };
    ;
    FirebaseDao.prototype.updateProducto = function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        producto = (0, ProductoDto_1.insertUpdateProductoDTOForFirebase)(productoToBeUpdate);
                        return [4 /*yield*/, this.Collection('productos').doc(id).update(producto)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductos()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 4:
                        console.log('Producto modificado', productoToBeUpdate.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.deleteProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, this.Collection('productos').doc(id).delete()];
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
                        console.log('Producto Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    ////////////////////////////////////////////////////////////////////////////////////////////
    FirebaseDao.prototype.insertOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderTotal, _i, order_1, carrito, orderToSend, adminOrder, clientOrder, i, lastOrderInserted, _id, finalOrder, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        orderTotal = order.pop();
                        for (_i = 0, order_1 = order; _i < order_1.length; _i++) {
                            carrito = order_1[_i];
                            this.Collection('carrito').doc(carrito._id).update({ cerrado: true });
                            delete carrito.cerrado;
                        }
                        return [4 /*yield*/, this.Collection('ordenes').add({
                                productos: order,
                                orderTotal: orderTotal.orderTotal,
                                timestamp: Date.now()
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 2:
                        _a.sent();
                        orderToSend = [];
                        adminOrder = [];
                        clientOrder = [];
                        for (i = 0; i <= order.length - 1; i += 1) {
                            adminOrder.push((0, OrdenDto_1.orderProductoAdminDTO)(order[i]));
                            clientOrder.push((0, OrdenDto_1.orderProductoClientDTO)(order[i]));
                        }
                        return [4 /*yield*/, this.Collection('ordenes').orderBy('timestamp', 'desc').limit(1).get()];
                    case 3:
                        lastOrderInserted = _a.sent();
                        _id = lastOrderInserted.docs[0].id;
                        finalOrder = (0, OrdenDto_1.orderFinalDTO)(String(_id), adminOrder, clientOrder, orderTotal.orderTotal);
                        orderToSend.push(finalOrder);
                        return [2 /*return*/, orderToSend];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw error_6;
                    case 5:
                        console.log('Orden Agregada');
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.insertProductToCarrito = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, productoMoficado, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        timestamp = producto.timestamp, productoMoficado = __rest(producto, ["timestamp"]);
                        return [4 /*yield*/, this.Collection('carrito').add({
                                quantity: 1,
                                producto: productoMoficado,
                                cerrado: false
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw error_7;
                    case 3:
                        console.log('Producto agregado a carrito', producto.title);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.getCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carritosEnDB, error_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.carrito = [];
                        return [4 /*yield*/, this.Collection('carrito').get()];
                    case 1:
                        carritosEnDB = _a.sent();
                        carritosEnDB.docs.map(function (carrito) {
                            if (carrito.data().cerrado === false) {
                                carrito.data()._id = String(carrito.id);
                                var newCarrito = new ICart_1.Cart(carrito.data().quantity, carrito.data().producto);
                                newCarrito._id = String(carrito.id);
                                newCarrito.cerrado = carrito.data().cerrado;
                                _this.carrito.push(newCarrito);
                            }
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw error_8;
                    case 3: return [2 /*return*/, this.carrito];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return String(element._id) === id; });
    };
    FirebaseDao.prototype.updateQtyInCarrito = function (carrito) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.Collection('carrito').doc(carrito._id).update({ quantity: carrito.quantity + 1, "producto": carrito.producto });
                        return [4 /*yield*/, this.getCarrito()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw error_9;
                    case 3:
                        console.log('Se agrego un producto similar al mismo carrito', carrito.producto.title);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseDao.prototype.deleteCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, this.Collection('carrito').doc(id).delete()];
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
                        console.log('Producto en carrito Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FirebaseDao;
}());
exports.FirebaseDao = FirebaseDao;
