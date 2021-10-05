"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart(quantity, producto) {
        this._id = '';
        this.timestamp = 0;
        this.producto = producto;
        this.quantity = quantity;
    }
    return Cart;
}());
exports.Cart = Cart;
