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
exports.MySqlDao = void 0;
var IOrder_1 = require("../interfaces/IOrder");
// import { optionsMariaDB } from "../options/mariaDB";
var optionsMariaDB = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "ecommerce",
    },
};
var MySqlDao = /** @class */ (function () {
    function MySqlDao() {
        var _this = this;
        this.createTableMensajes = function () { return __awaiter(_this, void 0, void 0, function () {
            var knex, tableName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 9]);
                        tableName = "mensajes";
                        return [4 /*yield*/, knex.schema.hasTable(tableName)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [2 /*return*/];
                    case 3:
                        console.log('mensajes Table create');
                        return [4 /*yield*/, knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.string("date").notNullable();
                                table.string("author").notNullable();
                                table.string("text");
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 7: return [4 /*yield*/, knex.destroy()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.createTableOrdenes = function () { return __awaiter(_this, void 0, void 0, function () {
            var knex, tableName, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 9]);
                        tableName = "ordenes";
                        return [4 /*yield*/, knex.schema.hasTable(tableName)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [2 /*return*/];
                    case 3:
                        console.log('ordenes Table create');
                        return [4 /*yield*/, knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.float("orderTotal").notNullable();
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 7: return [4 /*yield*/, knex.destroy()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.createTableCarrito = function () { return __awaiter(_this, void 0, void 0, function () {
            var knex, tableName, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 9]);
                        tableName = "carrito";
                        return [4 /*yield*/, knex.schema.hasTable(tableName)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [2 /*return*/];
                    case 3:
                        console.log('carito Table create');
                        return [4 /*yield*/, knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.integer("quantity").notNullable();
                                table.integer("producto_id").unsigned().index().notNullable();
                                table.integer("orden_id").unsigned().index();
                                table.foreign("producto_id").references('_id').inTable('productos');
                                table.foreign("orden_id").references('_id').inTable('ordenes');
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw error_3;
                    case 7: return [4 /*yield*/, knex.destroy()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.createTableProductos = function () { return __awaiter(_this, void 0, void 0, function () {
            var knex, tableName, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 9]);
                        tableName = "productos";
                        return [4 /*yield*/, knex.schema.hasTable(tableName)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [2 /*return*/];
                    case 3:
                        console.log('productos Table create');
                        return [4 /*yield*/, knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.string("title").notNullable();
                                table.string("description").notNullable();
                                table.string("code").notNullable();
                                table.string("thumbnail").notNullable();
                                table.float("price").notNullable();
                                table.integer("stock").notNullable();
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 7: return [4 /*yield*/, knex.destroy()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countCarrito = 1;
        this.countOrder = 1;
    }
    MySqlDao.prototype.insertProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 6]);
                        return [4 /*yield*/, knex("productos").insert([
                                {
                                    timestamp: Number(Date.now()),
                                    title: producto.title,
                                    description: producto.description,
                                    code: producto.code,
                                    thumbnail: producto.thumbnail,
                                    price: producto.price,
                                    stock: producto.stock,
                                },
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw error_5;
                    case 4:
                        console.log('Producto Agregado');
                        return [4 /*yield*/, knex.destroy()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.getProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knex, productosFromDB, _i, productosFromDB_1, producto, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableProductos()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createTableOrdenes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.createTableMensajes()];
                    case 3:
                        _a.sent();
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, 7, 9]);
                        return [4 /*yield*/, knex.from("productos").select("*")];
                    case 5:
                        productosFromDB = _a.sent();
                        this.productos = [];
                        for (_i = 0, productosFromDB_1 = productosFromDB; _i < productosFromDB_1.length; _i++) {
                            producto = productosFromDB_1[_i];
                            producto._id = String(producto._id);
                            this.productos.push(producto);
                        }
                        return [3 /*break*/, 9];
                    case 6:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw error_6;
                    case 7: return [4 /*yield*/, knex.destroy()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, this.productos];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MySqlDao.prototype.getProductoById = function (id) {
        return this.productos.find(function (element) { return element._id === id; });
    };
    ;
    MySqlDao.prototype.updateProducto = function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, error_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, knex.from("productos").where("_id", Number(id)).update({
                                title: productoToBeUpdate.title,
                                description: productoToBeUpdate.description,
                                code: productoToBeUpdate.code,
                                thumbnail: productoToBeUpdate.thumbnail,
                                price: productoToBeUpdate.price,
                                stock: productoToBeUpdate.stock
                            })];
                    case 2:
                        _a.sent();
                        this.productos.map(function (thisProduct) {
                            if (thisProduct._id === id) {
                                var index = _this.productos.indexOf(thisProduct);
                                _this.productos[index] = __assign(__assign({}, productoToBeUpdate), { _id: id, price: Number(productoToBeUpdate.price), stock: Number(productoToBeUpdate.stock) });
                            }
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw error_7;
                    case 4:
                        knex.destroy();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MySqlDao.prototype.deleteProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, productoToBeDelete, index, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        productoToBeDelete = this.getProductoById(id);
                        index = this.productos.indexOf(productoToBeDelete);
                        return [4 /*yield*/, knex.from("productos").where("_id", Number(id)).del()];
                    case 2:
                        _a.sent();
                        this.productos.splice(index, 1);
                        return [3 /*break*/, 5];
                    case 3:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw error_8;
                    case 4:
                        knex.destroy();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    ////////////////////////////////////////////////////////////////////////////////////////////
    MySqlDao.prototype.insertOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, newOrder, lastOrderInserted, _id, _i, order_1, cart, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 11]);
                        newOrder = new IOrder_1.Order(String(this.countOrder), Date.now(), order);
                        return [4 /*yield*/, knex("ordenes").insert([
                                {
                                    timestamp: Date.now(),
                                    orderTotal: newOrder.carrito[order.length - 1].orderTotal
                                },
                            ])];
                    case 2:
                        _a.sent();
                        order.pop();
                        return [4 /*yield*/, knex('ordenes').max('_id as id').first()];
                    case 3:
                        lastOrderInserted = _a.sent();
                        _id = lastOrderInserted.id;
                        _i = 0, order_1 = order;
                        _a.label = 4;
                    case 4:
                        if (!(_i < order_1.length)) return [3 /*break*/, 7];
                        cart = order_1[_i];
                        return [4 /*yield*/, knex.from("carrito").where("_id", Number(cart._id)).update({ orden_id: _id })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        this.carrito = [];
                        return [3 /*break*/, 11];
                    case 8:
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw error_9;
                    case 9:
                        console.log('Orden Agregada');
                        return [4 /*yield*/, knex.destroy()];
                    case 10:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.insertProductToCarrito = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, lastCarritoId, _id, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableCarrito()];
                    case 1:
                        _a.sent();
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 8]);
                        return [4 /*yield*/, knex("carrito").insert([
                                {
                                    timestamp: Number(Date.now()),
                                    quantity: 1,
                                    producto_id: producto._id
                                },
                            ])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, knex('carrito').max('_id as id').first()];
                    case 4:
                        lastCarritoId = _a.sent();
                        _id = String(lastCarritoId.id);
                        this.carrito.push({
                            _id: _id,
                            timestamp: Date.now(),
                            quantity: 1,
                            producto: producto,
                        });
                        return [3 /*break*/, 8];
                    case 5:
                        error_10 = _a.sent();
                        console.log(error_10);
                        throw error_10;
                    case 6:
                        console.log('Producto agregado a carrito');
                        return [4 /*yield*/, knex.destroy()];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.getCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knex, productosEnCarrito, _i, productosEnCarrito_1, carrito, productoId, productoEnCarrito, producto, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableCarrito()];
                    case 1:
                        _a.sent();
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 9, 11]);
                        return [4 /*yield*/, knex.from("carrito").select("*").whereNull('orden_id')];
                    case 3:
                        productosEnCarrito = _a.sent();
                        this.carrito = [];
                        _i = 0, productosEnCarrito_1 = productosEnCarrito;
                        _a.label = 4;
                    case 4:
                        if (!(_i < productosEnCarrito_1.length)) return [3 /*break*/, 7];
                        carrito = productosEnCarrito_1[_i];
                        productoId = carrito.producto_id;
                        return [4 /*yield*/, knex.from("productos").select("*").where("_id", "=", productoId)];
                    case 5:
                        productoEnCarrito = _a.sent();
                        producto = productoEnCarrito[0];
                        producto._id = String(producto._id);
                        carrito._id = String(carrito._id);
                        this.carrito.push({
                            _id: carrito._id,
                            timestamp: carrito.timestamp,
                            quantity: carrito.quantity,
                            producto: producto,
                        });
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 11];
                    case 8:
                        error_11 = _a.sent();
                        console.log(error_11);
                        throw error_11;
                    case 9: return [4 /*yield*/, knex.destroy()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, this.carrito];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return element._id === id; });
    };
    MySqlDao.prototype.updateQtyInCarrito = function (carrito) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, newCarrito, index, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, knex.from("carrito").where("_id", Number(carrito._id)).update({ quantity: carrito.quantity + 1 })];
                    case 2:
                        _a.sent();
                        newCarrito = __assign(__assign({}, carrito), { quantity: carrito.quantity + 1 });
                        index = this.carrito.indexOf(carrito);
                        this.carrito[index] = newCarrito;
                        return [3 /*break*/, 5];
                    case 3:
                        error_12 = _a.sent();
                        console.log(error_12);
                        throw error_12;
                    case 4:
                        knex.destroy();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.deleteCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, productoToBeDelete, index, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        productoToBeDelete = this.getCarritoById(id);
                        index = this.carrito.indexOf(productoToBeDelete);
                        return [4 /*yield*/, knex.from("carrito").where("_id", Number(id)).del()];
                    case 2:
                        _a.sent();
                        this.carrito.splice(index, 1);
                        return [3 /*break*/, 5];
                    case 3:
                        error_13 = _a.sent();
                        console.log(error_13);
                        throw error_13;
                    case 4:
                        knex.destroy();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    MySqlDao.prototype.getMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knex, mensajesFromDB, _i, mensajesFromDB_1, mensaje, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 6]);
                        return [4 /*yield*/, knex.from("mensajes").select("*")];
                    case 2:
                        mensajesFromDB = _a.sent();
                        this.mensajes = [];
                        for (_i = 0, mensajesFromDB_1 = mensajesFromDB; _i < mensajesFromDB_1.length; _i++) {
                            mensaje = mensajesFromDB_1[_i];
                            mensaje._id = String(mensaje._id);
                            this.mensajes.push(mensaje);
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        error_14 = _a.sent();
                        console.log(error_14);
                        throw error_14;
                    case 4: return [4 /*yield*/, knex.destroy()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this.mensajes];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MySqlDao.prototype.insertMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 6]);
                        this.mensajes.push(mensaje);
                        return [4 /*yield*/, knex("mensajes").insert([
                                {
                                    date: mensaje.date,
                                    author: mensaje.author,
                                    text: mensaje.text,
                                },
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_15 = _a.sent();
                        console.log(error_15);
                        throw error_15;
                    case 4:
                        console.log('Mensaje Agregado');
                        return [4 /*yield*/, knex.destroy()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MySqlDao;
}());
exports.MySqlDao = MySqlDao;
