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
exports.MemoryDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usuarios_1 = require("../../models/usuarios");
var loggers_1 = require("../../loggers");
var ProductoDto_1 = require("../dto/ProductoDto");
var OrdenDto_1 = require("../dto/OrdenDto");
var MensajeDto_1 = require("../dto/MensajeDto");
var MemoryDao = /** @class */ (function () {
    function MemoryDao() {
        this.MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countProducto = 1;
        this.countCarrito = 1;
        this.countOrder = 1;
        this.conectar();
    }
    MemoryDao.prototype.conectar = function () {
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
    MemoryDao.prototype.findUser = function (username) {
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
    MemoryDao.prototype.filterProducto = function (filtro, filterBy) {
        var productos = [];
        if (filterBy === 'nombre') {
            var filtroCapitalized_1 = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
            this.productos.forEach(function (producto) {
                if (producto.title === filtro[0] || producto.title === filtroCapitalized_1) {
                    productos.push((0, ProductoDto_1.productoDTOForMemory)(producto));
                }
            });
        }
        else if (filterBy === 'codigo') {
            this.productos.forEach(function (producto) {
                if (producto.code === filtro[0]) {
                    productos.push((0, ProductoDto_1.productoDTOForMemory)(producto));
                }
            });
        }
        else if (filterBy === 'precio') {
            this.productos.forEach(function (producto) {
                if ((Number(producto.price) >= Number(filtro[0])) && (Number(producto.price) <= Number(filtro[1]))) {
                    productos.push((0, ProductoDto_1.productoDTOForMemory)(producto));
                }
            });
        }
        else if (filterBy === 'stock') {
            this.productos.forEach(function (producto) {
                if ((Number(producto.stock) >= Number(filtro[0])) && (Number(producto.stock) <= Number(filtro[1]))) {
                    productos.push((0, ProductoDto_1.productoDTOForMemory)(producto));
                }
            });
        }
        return productos;
    };
    MemoryDao.prototype.insertProducto = function (producto) {
        var productoDTO = (0, ProductoDto_1.insertUpdateProductoDTOForMemory)(producto, String(this.countProducto));
        this.productos.push(productoDTO);
        this.countProducto++;
    };
    MemoryDao.prototype.getProductos = function () {
        var productos = [];
        this.productos.map(function (producto) {
            productos.push((0, ProductoDto_1.productoDTOForMemory)(producto));
        });
        return productos;
    };
    ;
    MemoryDao.prototype.getProductoById = function (id) {
        return this.productos.find(function (element) { return element._id === id; });
    };
    ;
    MemoryDao.prototype.updateProducto = function (id, producto) {
        var _this = this;
        var productToBeUpdate = this.getProductoById(id);
        this.productos.map(function (thisProduct) {
            if (thisProduct._id === productToBeUpdate._id) {
                var index = _this.productos.indexOf(thisProduct);
                _this.productos[index] = (0, ProductoDto_1.insertUpdateProductoDTOForMemory)(producto, id);
            }
        });
    };
    ;
    MemoryDao.prototype.deleteProducto = function (id) {
        var productoToBeDelete = this.getProductoById(id);
        var index = this.productos.indexOf(productoToBeDelete);
        this.productos.splice(index, 1);
    };
    ;
    MemoryDao.prototype.insertOrder = function (order) {
        try {
            var orderToSend = [];
            var adminOrder = [];
            var clientOrder = [];
            for (var i = 0; i < order.length - 1; i += 1) {
                adminOrder.push((0, OrdenDto_1.orderProductoAdminDTO)(order[i]));
                clientOrder.push((0, OrdenDto_1.orderProductoClientDTO)(order[i]));
            }
            var finalOrder = (0, OrdenDto_1.orderFinalDTO)(String(this.countOrder), adminOrder, clientOrder, order[order.length - 1].orderTotal);
            orderToSend.push(finalOrder);
            this.carrito = [];
            this.countOrder++;
            loggers_1.loggerInfo.info('Orden insertada correctamente');
            loggers_1.loggerWarn.warn(orderToSend);
            return orderToSend;
        }
        catch (error) {
            loggers_1.loggerError.error("MongoDB: Error en insertOrder: " + error);
        }
    };
    MemoryDao.prototype.insertProductToCarrito = function (producto) {
        var _id = String(this.countCarrito);
        var productoDTO = (0, ProductoDto_1.productoDTOForMemory)(producto);
        var newCarrito = {
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto: productoDTO
        };
        this.carrito.push(newCarrito);
    };
    MemoryDao.prototype.getCarrito = function () {
        return this.carrito;
    };
    MemoryDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return element._id === id; });
    };
    MemoryDao.prototype.updateQtyInCarrito = function (carrito) {
        var _this = this;
        var newCarrito = __assign(__assign({}, carrito), { quantity: carrito.quantity + 1 });
        this.carrito.map(function (thisCarrito) {
            if (thisCarrito._id === newCarrito._id) {
                var index = _this.carrito.indexOf(thisCarrito);
                _this.carrito[index] = newCarrito;
            }
        });
    };
    MemoryDao.prototype.deleteCarrito = function (id) {
        var productoToBeDelete = this.getCarritoById(id);
        var index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
    };
    MemoryDao.prototype.getMensajeById = function (id) {
        return this.mensajes.find(function (element) { return String(element.id) === id; });
    };
    MemoryDao.prototype.getMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wrapMensajes;
            return __generator(this, function (_a) {
                try {
                    wrapMensajes = (0, MensajeDto_1.MensajeDTO)(this.mensajes);
                    return [2 /*return*/, wrapMensajes];
                }
                catch (error) {
                    loggers_1.loggerError.error(error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    MemoryDao.prototype.insertMensajes = function (mensaje) {
        this.mensajes.push(mensaje);
    };
    return MemoryDao;
}());
exports.MemoryDao = MemoryDao;
