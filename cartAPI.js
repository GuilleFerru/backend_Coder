"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartApi = void 0;
var express_1 = __importDefault(require("express"));
var server_1 = require("./server");
var cartApi = function () {
    var carritoProducts = express_1.default.Router();
    server_1.app.use("/carrito", carritoProducts);
    carritoProducts.post("/agregar/:id_producto", function (req, res) {
        var id = parseInt(req.params.id_producto, 10);
        var productById = server_1.productLogic.getProductsById(id);
        if (productById) {
            var carts = server_1.cartLogic.getCart();
            if (carts.length > 0) {
                var cartToBeUpdate = carts.find(function (cart) { var _a; return ((_a = cart.product) === null || _a === void 0 ? void 0 : _a.id) === id; });
                if (cartToBeUpdate) {
                    server_1.cartLogic.updateQtyInCart(cartToBeUpdate);
                }
                else {
                    server_1.cartLogic.addProductToCart(productById);
                }
            }
            else {
                server_1.cartLogic.addProductToCart(productById);
            }
            res.status(200).json({ server: "Producto agregado al carrito" });
        }
        else {
            res.status(404).json({ error: "producto no encontrado" });
        }
    });
    var checkIdProductInCarrito = function (req, res, next) {
        var id = parseInt(req.params.id, 10);
        var cart = server_1.cartLogic.getCartById(id);
        if (id) {
            if ((cart === null || cart === void 0 ? void 0 : cart.id) === id) {
                res.status(200).json(cart.product);
            }
            else {
                res
                    .status(404)
                    .json({ error: "este producto no esta cargado en el carrito" });
            }
        }
        else {
            next();
        }
    };
    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, function (_, res) {
        var carritos = server_1.cartLogic.getCart();
        res.status(200).json(carritos);
    });
    carritoProducts.delete("/borrar/:id", function (req, res) {
        var id = parseInt(req.params.id, 10);
        var cartToBeDelete = server_1.cartLogic.getCartById(id);
        if (cartToBeDelete) {
            res.status(200).json(server_1.cartLogic.deleteCart(cartToBeDelete));
            server_1.io.sockets.emit("carts", server_1.cartLogic.getCart());
        }
        else {
            res.status(404).json({ error: "carrito no existente, no se puede borrar" });
        }
    });
};
exports.cartApi = cartApi;
