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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usuarios_1 = require("../../models/usuarios");
var IOrder_1 = require("../../interfaces/IOrder");
var loggers_1 = require("../../loggers");
var ProductoDto_1 = require("../dto/ProductoDto");
var OrdenDto_1 = require("../dto/OrdenDto");
var MensajeDto_1 = require("../dto/MensajeDto");
var optionsSQLite = {
    client: 'sqlite3',
    connection: {
        filename: './SQLiteDB/ecommerce.sqlite'
    },
    useNullAsDefault: true
};
var SQLiteDao = /** @class */ (function () {
    function SQLiteDao() {
        var _this = this;
        this.MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
        this.dropTables = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const knex = require("knex")(optionsMariaDB);
                        console.log('mensajes Table create');
                        return [4 /*yield*/, this.knex.schema.dropTable("mensajes")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.knex.schema.dropTable("author")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.knex.schema.dropTable("ordenes")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.knex.schema.dropTable("productos")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.knex.schema.dropTable("carrito")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.createTableMensajes = function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        tableName = "mensajes";
                        return [4 /*yield*/, this.knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        console.log('mensajes Table create');
                        return [4 /*yield*/, this.knex.schema.createTable(tableName, (function (table) {
                                table.increments("_id").primary();
                                table.string("date").notNullable();
                                table.string("text");
                                table.integer("author_id").unsigned().index();
                                table.foreign("author_id").references('_id').inTable('mensajes');
                            }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.createTableAuthor = function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        tableName = "author";
                        return [4 /*yield*/, this.knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        console.log('author Table create');
                        return [4 /*yield*/, this.knex.schema.createTable(tableName, (function (table) {
                                table.increments("_id").primary();
                                table.string("email").unique();
                                table.string("nombre").notNullable();
                                table.string("apellido").notNullable();
                                table.string("edad").notNullable();
                                table.string("alias").notNullable();
                                table.string("avatar").notNullable();
                            }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.createTableOrdenes = function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        tableName = "ordenes";
                        return [4 /*yield*/, this.knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        console.log('ordenes Table create');
                        return [4 /*yield*/, this.knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.float("orderTotal").notNullable();
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw error_3;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.createTableCarrito = function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        tableName = "carrito";
                        return [4 /*yield*/, this.knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        console.log('carito Table create');
                        return [4 /*yield*/, this.knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.integer("quantity").notNullable();
                                table.integer("producto_id").unsigned().index().notNullable();
                                table.integer("orden_id").unsigned().index();
                                table.foreign("producto_id").references('_id').inTable('productos');
                                table.foreign("orden_id").references('_id').inTable('ordenes');
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.createTableProductos = function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        tableName = "productos";
                        return [4 /*yield*/, this.knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        console.log('productos Table create');
                        return [4 /*yield*/, this.knex.schema.createTable(tableName, function (table) {
                                table.increments("_id").primary();
                                table.bigInteger("timestamp").notNullable();
                                table.string("title").notNullable();
                                table.string("description").notNullable();
                                table.string("code").notNullable();
                                table.string("thumbnail").notNullable();
                                table.float("price").notNullable();
                                table.integer("stock").notNullable();
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw error_5;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.knex = require("knex")(optionsSQLite);
        this.conectar();
    }
    SQLiteDao.prototype.conectar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loggers_1.loggerInfo.info('Base de datos MongoDBAaS conectada!');
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
    SQLiteDao.prototype.findUser = function (username) {
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
    SQLiteDao.prototype.filterProducto = function (filtro, filterBy) {
        return __awaiter(this, void 0, void 0, function () {
            var filtroCapitalized, productosByName, productosByCode, productosByPrecio, productosByStock, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 11]);
                        this.productos = [];
                        if (!(filterBy === 'nombre')) return [3 /*break*/, 2];
                        filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
                        return [4 /*yield*/, this.knex.from("productos").select("*").where("title", String(filtro[0])).orWhere("title", String(filtroCapitalized))];
                    case 1:
                        productosByName = _a.sent();
                        productosByName.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(filterBy === 'codigo')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.knex.from("productos").select("*").where("code", String(filtro[0]))];
                    case 3:
                        productosByCode = _a.sent();
                        productosByCode.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(filterBy === 'precio')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.knex.from("productos").select("*").whereBetween('price', [filtro[0], filtro[1]])];
                    case 5:
                        productosByPrecio = _a.sent();
                        productosByPrecio.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(filterBy === 'stock')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.knex.from("productos").select("*").whereBetween('stock', [filtro[0], filtro[1]])];
                    case 7:
                        productosByStock = _a.sent();
                        productosByStock.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw error_6;
                    case 10: return [2 /*return*/, this.productos];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.insertProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, this.knex("productos").insert([(0, ProductoDto_1.insertUpdateProductoDTOForSQL)(producto)])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw error_7;
                    case 3:
                        console.log('Producto Agregado');
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.getProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosFromDB, _i, productosFromDB_1, producto, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableProductos()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createTableOrdenes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.createTableAuthor()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.createTableMensajes()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, 8, 9]);
                        return [4 /*yield*/, this.knex.from("productos").select("*")];
                    case 6:
                        productosFromDB = _a.sent();
                        this.productos = [];
                        for (_i = 0, productosFromDB_1 = productosFromDB; _i < productosFromDB_1.length; _i++) {
                            producto = productosFromDB_1[_i];
                            this.productos.push((0, ProductoDto_1.productoDTOForSQL)(producto));
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw error_8;
                    case 8: return [2 /*return*/, this.productos];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ;
    SQLiteDao.prototype.getProductoById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex.from("productos").where("_id", Number(id))];
                    case 1:
                        producto = _a.sent();
                        return [2 /*return*/, producto.pop()];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    ;
    SQLiteDao.prototype.updateProducto = function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, error_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        producto = (0, ProductoDto_1.insertUpdateProductoDTOForSQL)(productoToBeUpdate);
                        return [4 /*yield*/, this.knex.from("productos").where("_id", Number(id)).update(producto)];
                    case 1:
                        _a.sent();
                        this.productos.map(function (thisProduct) {
                            if (thisProduct._id === id) {
                                var index = _this.productos.indexOf(thisProduct);
                                _this.productos[index] = __assign(__assign({}, productoToBeUpdate), { _id: id, price: Number(productoToBeUpdate.price), stock: Number(productoToBeUpdate.stock) });
                            }
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw error_9;
                    case 3:
                        console.log('Producto Actualizado');
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    SQLiteDao.prototype.deleteProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productoToBeDelete, index, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        productoToBeDelete = this.getProductoById(id);
                        index = this.productos.indexOf(productoToBeDelete);
                        return [4 /*yield*/, this.knex.from("productos").where("_id", Number(id)).del()];
                    case 1:
                        _a.sent();
                        this.productos.splice(index, 1);
                        return [3 /*break*/, 4];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        throw error_10;
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    ////////////////////////////////////////////////////////////////////////////////////////////
    SQLiteDao.prototype.insertOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var respondeOrderTotal, newOrder, lastOrderInserted, _id, _i, order_1, cart, orderToSend, adminOrder, clientOrder, i, finalOrder, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        respondeOrderTotal = (order.slice(-1))[0].orderTotal;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        newOrder = new IOrder_1.Order(String(this.countOrder), Date.now(), order);
                        return [4 /*yield*/, this.knex("ordenes").insert([
                                {
                                    timestamp: Date.now(),
                                    orderTotal: newOrder.carrito[order.length - 1].orderTotal
                                },
                            ])];
                    case 2:
                        _a.sent();
                        order.pop();
                        return [4 /*yield*/, this.knex('ordenes').max('_id as id').first()];
                    case 3:
                        lastOrderInserted = _a.sent();
                        _id = lastOrderInserted.id;
                        _i = 0, order_1 = order;
                        _a.label = 4;
                    case 4:
                        if (!(_i < order_1.length)) return [3 /*break*/, 7];
                        cart = order_1[_i];
                        return [4 /*yield*/, this.knex.from("carrito").where("_id", Number(cart._id)).update({ orden_id: _id })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        orderToSend = [];
                        adminOrder = [];
                        clientOrder = [];
                        this.carrito = [];
                        for (i = 0; i <= order.length - 1; i += 1) {
                            adminOrder.push((0, OrdenDto_1.orderProductoAdminDTO)(order[i]));
                            clientOrder.push((0, OrdenDto_1.orderProductoClientDTO)(order[i]));
                        }
                        finalOrder = (0, OrdenDto_1.orderFinalDTO)(_id, adminOrder, clientOrder, respondeOrderTotal);
                        orderToSend.push(finalOrder);
                        this.carrito = [];
                        return [2 /*return*/, orderToSend];
                    case 8:
                        error_11 = _a.sent();
                        console.log(error_11);
                        throw error_11;
                    case 9:
                        console.log('Orden Agregada');
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.insertProductToCarrito = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var lastCarritoId, _id, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableCarrito()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 7]);
                        return [4 /*yield*/, this.knex("carrito").insert([
                                {
                                    timestamp: Number(Date.now()),
                                    quantity: 1,
                                    producto_id: producto._id
                                },
                            ])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.knex('carrito').max('_id as id').first()];
                    case 4:
                        lastCarritoId = _a.sent();
                        _id = String(lastCarritoId.id);
                        this.carrito.push({
                            _id: _id,
                            timestamp: Date.now(),
                            quantity: 1,
                            producto: producto,
                        });
                        return [3 /*break*/, 7];
                    case 5:
                        error_12 = _a.sent();
                        console.log(error_12);
                        throw error_12;
                    case 6:
                        console.log('Producto agregado a carrito');
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.getCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosEnCarrito, _i, productosEnCarrito_1, carrito, productoId, productoEnCarrito, producto, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTableCarrito()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 9, 10]);
                        return [4 /*yield*/, this.knex.from("carrito").select("*").whereNull('orden_id')];
                    case 3:
                        productosEnCarrito = _a.sent();
                        this.carrito = [];
                        _i = 0, productosEnCarrito_1 = productosEnCarrito;
                        _a.label = 4;
                    case 4:
                        if (!(_i < productosEnCarrito_1.length)) return [3 /*break*/, 7];
                        carrito = productosEnCarrito_1[_i];
                        productoId = carrito.producto_id;
                        return [4 /*yield*/, this.knex.from("productos").select("*").where("_id", "=", productoId)];
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
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        error_13 = _a.sent();
                        console.log(error_13);
                        throw error_13;
                    case 9: 
                    // await knex.destroy();
                    return [2 /*return*/, this.carrito];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return element._id === id; });
    };
    SQLiteDao.prototype.updateQtyInCarrito = function (carrito) {
        return __awaiter(this, void 0, void 0, function () {
            var newCarrito_1, error_14;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, this.knex.from("carrito").where("_id", Number(carrito._id)).update({ quantity: carrito.quantity + 1 })];
                    case 1:
                        _a.sent();
                        newCarrito_1 = __assign(__assign({}, carrito), { quantity: carrito.quantity + 1 });
                        this.carrito.map(function (thisCarrito) {
                            if (thisCarrito._id === newCarrito_1._id) {
                                var index = _this.carrito.indexOf(thisCarrito);
                                _this.carrito[index] = newCarrito_1;
                            }
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_14 = _a.sent();
                        console.log(error_14);
                        throw error_14;
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.deleteCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productoToBeDelete, index, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        productoToBeDelete = this.getCarritoById(id);
                        index = this.carrito.indexOf(productoToBeDelete);
                        return [4 /*yield*/, this.knex.from("carrito").where("_id", Number(id)).del()];
                    case 1:
                        _a.sent();
                        this.carrito.splice(index, 1);
                        return [3 /*break*/, 4];
                    case 2:
                        error_15 = _a.sent();
                        console.log(error_15);
                        throw error_15;
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    SQLiteDao.prototype.getMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mensajesFromDB, _i, mensajesFromDB_1, mensaje, auhtorId, author, authorObject, msgComplete, error_16, wrapMensajes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, 7, 8]);
                        return [4 /*yield*/, this.knex.from("mensajes").select("*")];
                    case 1:
                        mensajesFromDB = _a.sent();
                        this.mensajes = [];
                        _i = 0, mensajesFromDB_1 = mensajesFromDB;
                        _a.label = 2;
                    case 2:
                        if (!(_i < mensajesFromDB_1.length)) return [3 /*break*/, 5];
                        mensaje = mensajesFromDB_1[_i];
                        auhtorId = String(mensaje.author_id);
                        return [4 /*yield*/, this.knex.from("author").where("_id", Number(auhtorId))];
                    case 3:
                        author = _a.sent();
                        authorObject = {
                            _id: String(author[0]._id),
                            email: author[0].email,
                            nombre: author[0].nombre,
                            apellido: author[0].apellido,
                            edad: author[0].edad,
                            alias: author[0].alias,
                            avatar: author[0].avatar,
                        };
                        msgComplete = {
                            id: mensaje._id,
                            text: mensaje.text,
                            date: mensaje.date,
                            author: authorObject,
                        };
                        this.mensajes.push(msgComplete);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_16 = _a.sent();
                        console.log(error_16);
                        throw error_16;
                    case 7:
                        wrapMensajes = (0, MensajeDto_1.MensajeDTO)(this.mensajes);
                        return [2 /*return*/, wrapMensajes];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.insertMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var authorEmail, authorGuardado, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.mensajes.push(mensaje);
                        authorEmail = mensaje.author.email;
                        return [4 /*yield*/, this.knex.from("author").select("*").where("email", "=", authorEmail)];
                    case 1:
                        authorGuardado = _a.sent();
                        if (!(authorGuardado.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.knex.from("author").insert([
                                {
                                    email: mensaje.author.email,
                                    nombre: mensaje.author.nombre,
                                    apellido: mensaje.author.apellido,
                                    edad: mensaje.author.edad,
                                    alias: mensaje.author.alias,
                                    avatar: mensaje.author.avatar
                                },
                            ])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.knex("mensajes").insert([
                            {
                                date: mensaje.date,
                                text: mensaje.text,
                                author_id: authorGuardado[0]._id
                            },
                        ])];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_17 = _a.sent();
                        console.log(error_17);
                        throw error_17;
                    case 6:
                        console.log('Mensaje Agregado');
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SQLiteDao.prototype.getMensajeById = function (id) {
        return this.mensajes.find(function (element) { return String(element.id) === id; });
    };
    return SQLiteDao;
}());
exports.SQLiteDao = SQLiteDao;
