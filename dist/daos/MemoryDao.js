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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDao = void 0;
var IOrder_1 = require("../interfaces/IOrder");
var MemoryDao = /** @class */ (function () {
    function MemoryDao() {
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.mensajes = new Array();
        this.countProducto = 1;
        this.countCarrito = 1;
        this.countOrder = 1;
    }
    MemoryDao.prototype.filterProducto = function (filtro) {
        console.log(filtro);
        if (filtro[0] === '') {
            return this.productos;
        }
        else {
            this.productos = [];
            var productoFiltrado = this.productos.find(function (element) {
                element.title === filtro[0] ||
                    element.code === filtro[0];
            });
            this.productos.push(productoFiltrado);
            return this.productos;
        }
    };
    MemoryDao.prototype.insertProducto = function (producto) {
        producto._id = String(this.countProducto);
        this.productos.push(producto);
        console.log(this.productos);
        this.countProducto++;
    };
    MemoryDao.prototype.getProductos = function () {
        return this.productos;
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
                _this.productos[index] = __assign(__assign({}, producto), { _id: id });
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
        var newOrder = new IOrder_1.Order(String(this.countOrder), Date.now(), order);
        this.carrito = [];
        console.log(newOrder);
        this.countOrder++;
    };
    MemoryDao.prototype.insertProductToCarrito = function (producto) {
        var _id = String(this.countCarrito);
        this.carrito.push({
            _id: _id,
            timestamp: Date.now(),
            quantity: 1,
            producto: producto,
        });
        this.countCarrito++;
    };
    MemoryDao.prototype.getCarrito = function () {
        return this.carrito;
    };
    MemoryDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return element._id === id; });
    };
    MemoryDao.prototype.updateQtyInCarrito = function (carrito) {
        var newCarrito = __assign(__assign({}, carrito), { quantity: carrito.quantity + 1 });
        var index = this.carrito.indexOf(carrito);
        this.carrito[index] = newCarrito;
    };
    MemoryDao.prototype.deleteCarrito = function (id) {
        var productoToBeDelete = this.getCarritoById(id);
        var index = this.carrito.indexOf(productoToBeDelete);
        this.carrito.splice(index, 1);
    };
    MemoryDao.prototype.getMensajes = function () {
        return this.mensajes;
    };
    MemoryDao.prototype.insertMensajes = function (mensaje) {
        this.mensajes.push(mensaje);
    };
    return MemoryDao;
}());
exports.MemoryDao = MemoryDao;
