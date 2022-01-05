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
exports.FileSystemDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var fs = __importStar(require("fs"));
var usuarios_1 = require("../models/usuarios");
var IMensaje_1 = require("../interfaces/IMensaje");
var loggers_1 = require("../loggers");
var FileSystemDao = /** @class */ (function () {
    function FileSystemDao() {
        this.MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
        this.pathProducto = "./fileSystemDB/productos.txt";
        this.pathCarrito = "./fileSystemDB/carrito.txt";
        this.pathOrder = "./fileSystemDB/order.txt";
        this.pathMensajes = "./fileSystemDB/mensajes.txt";
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countCarrito = 1;
        this.countOrder = 1;
        this.conectar();
    }
    FileSystemDao.prototype.conectar = function () {
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
    FileSystemDao.prototype.findUser = function (username) {
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
    FileSystemDao.prototype.getNewId = function () {
        var maxId = Math.max.apply(Math, __spreadArray(__spreadArray([], this.productos.map(function (prd) { return Number(prd._id); }), false), [0], false));
        var newId = maxId + 1;
        return String(newId);
    };
    FileSystemDao.prototype.filterProducto = function (filtro, filterBy) {
        var productos = [];
        if (filterBy === 'nombre') {
            var filtroCapitalized_1 = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
            this.productos.forEach(function (producto) {
                if (producto.title === filtro[0] || producto.title === filtroCapitalized_1) {
                    productos.push(producto);
                }
            });
        }
        else if (filterBy === 'codigo') {
            this.productos.forEach(function (producto) {
                if (producto.code === filtro[0]) {
                    productos.push(producto);
                }
            });
        }
        else if (filterBy === 'precio') {
            this.productos.forEach(function (producto) {
                if ((Number(producto.price) >= Number(filtro[0])) && (Number(producto.price) <= Number(filtro[1]))) {
                    productos.push(producto);
                }
            });
        }
        else if (filterBy === 'stock') {
            this.productos.forEach(function (producto) {
                if ((Number(producto.stock) >= Number(filtro[0])) && (Number(producto.stock) <= Number(filtro[1]))) {
                    productos.push(producto);
                }
            });
        }
        return productos;
    };
    FileSystemDao.prototype.insertProducto = function (producto) {
        producto._id = this.getNewId();
        this.productos.push(producto);
        try {
            var productosFromTxt = fs.readFileSync(this.pathProducto, 'utf-8');
            var jsonProductosFromTxt = JSON.parse(productosFromTxt);
            var productosNew = __spreadArray(__spreadArray([], jsonProductosFromTxt, true), [producto], false);
            fs.writeFileSync(this.pathProducto, JSON.stringify(productosNew, null, "\t"));
        }
        catch (error) {
            fs.writeFileSync(this.pathProducto, JSON.stringify(this.productos, null, "\t"));
        }
    };
    FileSystemDao.prototype.getProductos = function () {
        var _this = this;
        fs.readFile(this.pathProducto, "utf8", function (error, content) {
            if (error) {
                console.error("Hubo un error con fs.readFile de producto!");
            }
            else {
                _this.productos = [];
                var savedProducts = JSON.parse(content);
                savedProducts.forEach(function (producto) {
                    _this.productos.push(producto);
                });
            }
        });
        return this.productos;
    };
    ;
    FileSystemDao.prototype.getProductoById = function (id) {
        return this.productos.find(function (element) { return element._id === id; });
    };
    ;
    FileSystemDao.prototype.updateProducto = function (id, producto) {
        var _this = this;
        var productToBeUpdate = this.getProductoById(id);
        this.productos.map(function (thisProduct) {
            if (thisProduct._id === productToBeUpdate._id) {
                var index = _this.productos.indexOf(thisProduct);
                _this.productos[index] = __assign(__assign({}, producto), { _id: id });
                fs.writeFileSync(_this.pathProducto, JSON.stringify(_this.productos, null, "\t"));
            }
        });
    };
    ;
    FileSystemDao.prototype.deleteProducto = function (id) {
        var productoToBeDelete = this.getProductoById(id);
        var index = this.productos.indexOf(productoToBeDelete);
        this.productos.splice(index, 1);
        fs.writeFileSync(this.pathProducto, JSON.stringify(this.productos, null, "\t"));
    };
    ;
    /////////////////////////////////////////////////////////////////////////////////////////////
    FileSystemDao.prototype.insertOrder = function (order) {
        // console.log(order[0].producto,'en dao');
        this.carrito = [];
        var finalOrder = [];
        var newOrder = {
            _id: String(this.countOrder),
            productos: [order[0]],
            orderTotal: order[1].orderTotal
        };
        finalOrder.push(newOrder);
        fs.writeFileSync(this.pathOrder, JSON.stringify(newOrder, null, "\t"));
        fs.unlinkSync(this.pathCarrito);
        this.countOrder++;
        return finalOrder;
    };
    FileSystemDao.prototype.insertProductToCarrito = function (producto) {
        var _id = String(this.countCarrito);
        var newCarrito = {
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto: producto,
        };
        this.carrito.push(newCarrito);
        try {
            var carritoFromTxt = fs.readFileSync(this.pathCarrito, 'utf-8');
            var jsonCarritoFromTxt = JSON.parse(carritoFromTxt);
            var array = __spreadArray(__spreadArray([], jsonCarritoFromTxt, true), [newCarrito], false);
            fs.writeFileSync(this.pathCarrito, JSON.stringify(array, null, "\t"));
        }
        catch (error) {
            fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
        }
        this.countCarrito++;
    };
    FileSystemDao.prototype.getCarrito = function () {
        var _this = this;
        fs.readFile(this.pathCarrito, "utf8", function (error, content) {
            if (error) {
                console.error("Hubo un error con fs.readFile de carrito!");
            }
            else {
                _this.carrito.splice(0, _this.carrito.length);
                // console.log(this.carrito, 'carrito', content,'content');
                var savedCarrito = JSON.parse(content);
                savedCarrito.forEach(function (carrito) {
                    _this.carrito.push(carrito);
                });
            }
        });
        return this.carrito;
    };
    FileSystemDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return element._id === id; });
    };
    FileSystemDao.prototype.updateQtyInCarrito = function (carrito) {
        var newCarrito = __assign(__assign({}, carrito), { quantity: carrito.quantity + 1 });
        var index = this.carrito.indexOf(carrito);
        this.carrito[index] = newCarrito;
        fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
    };
    FileSystemDao.prototype.deleteCarrito = function (id) {
        var productoToBeDelete = this.getCarritoById(id);
        var index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
        fs.writeFileSync(this.pathCarrito, JSON.stringify(this.carrito, null, "\t"));
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    FileSystemDao.prototype.getMensajes = function () {
        var _this = this;
        fs.readFile(this.pathMensajes, "utf8", function (error, content) {
            if (error) {
                console.error("Hubo un error con fs.readFile de mensaje!");
            }
            else {
                _this.mensajes = [];
                var savedMensajes = JSON.parse(content);
                savedMensajes.forEach(function (msj) {
                    _this.mensajes.push(msj);
                });
            }
        });
        var wrapMensajes = new IMensaje_1.MensajeWrap('999', this.mensajes);
        return wrapMensajes;
    };
    FileSystemDao.prototype.getMensajeById = function (id) {
        return this.mensajes.find(function (element) { return String(element.id) === id; });
    };
    FileSystemDao.prototype.insertMensajes = function (mensaje) {
        this.mensajes.push(mensaje);
        fs.writeFileSync(this.pathMensajes, JSON.stringify(this.mensajes, null, "\t"));
    };
    return FileSystemDao;
}());
exports.FileSystemDao = FileSystemDao;
