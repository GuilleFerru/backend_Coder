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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDao = void 0;
var fs = __importStar(require("fs"));
var IOrder_1 = require("../interfaces/IOrder");
var FileSystemDao = /** @class */ (function () {
    function FileSystemDao() {
        this.pathProducto = "./DB/fileSystemDB/productos.txt";
        this.pathCarrito = "./DB/fileSystemDB/carrito.txt";
        this.pathOrder = "./DB/fileSystemDB/order.txt";
        this.pathMensajes = "./DB/fileSystemDB/mensajes.txt";
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countCarrito = 1;
        this.countOrder = 1;
    }
    FileSystemDao.prototype.getNewId = function () {
        var maxId = Math.max.apply(Math, __spreadArray(__spreadArray([], this.productos.map(function (prd) { return Number(prd._id); }), false), [0], false));
        var newId = maxId + 1;
        return String(newId);
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
        var newOrder = new IOrder_1.Order(String(this.countOrder), Date.now(), order);
        this.carrito = [];
        fs.writeFileSync(this.pathOrder, JSON.stringify(newOrder, null, "\t"));
        fs.unlinkSync(this.pathCarrito);
        this.countOrder++;
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
                _this.carrito = [];
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
        return this.mensajes;
    };
    FileSystemDao.prototype.insertMensajes = function (mensaje) {
        this.mensajes.push(mensaje);
        fs.writeFileSync(this.pathMensajes, JSON.stringify(this.mensajes, null, "\t"));
    };
    return FileSystemDao;
}());
exports.FileSystemDao = FileSystemDao;
