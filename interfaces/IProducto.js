"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
var Producto = /** @class */ (function () {
    function Producto(title, description, code, thumbnail, price, stock) {
        this._id = '';
        this.timestamp = Date.now();
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.price = price;
        this.stock = stock;
    }
    return Producto;
}());
exports.Producto = Producto;
