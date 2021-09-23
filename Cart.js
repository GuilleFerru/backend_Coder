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
exports.CartLogic = void 0;
var CartLogic = /** @class */ (function () {
    function CartLogic() {
        this.count = 0;
        this.timestamp = 0;
        this.cart = new Array();
    }
    CartLogic.prototype.getCart = function () {
        return this.cart;
    };
    CartLogic.prototype.getProductsInCart = function () {
        return this.cart;
    };
    CartLogic.prototype.getCartById = function (id) {
        return this.cart.find(function (element) { return element.id === id; });
    };
    CartLogic.prototype.addProductToCart = function (product) {
        this.cart.push({
            id: this.count + 1,
            timestamp: Date.now(),
            quantity: 1,
            product: product,
        });
        this.count++;
        return this.cart;
    };
    CartLogic.prototype.updateQtyInCart = function (cart) {
        var newCart = __assign(__assign({}, cart), { quantity: cart.quantity + 1 });
        var index = this.cart.indexOf(cart);
        this.cart[index] = newCart;
    };
    CartLogic.prototype.deleteCart = function (cartToBeDelete) {
        var index = this.cart.indexOf(cartToBeDelete);
        this.cart.splice(index, 1);
        return cartToBeDelete;
    };
    return CartLogic;
}());
exports.CartLogic = CartLogic;
