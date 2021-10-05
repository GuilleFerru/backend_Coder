"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order(id, timestamp, carrito) {
        this._id = '';
        this._id = id;
        this.timestamp = timestamp;
        this.carrito = carrito;
    }
    return Order;
}());
exports.Order = Order;
