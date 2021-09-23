"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productApi = void 0;
var express_1 = __importDefault(require("express"));
var Product_1 = require("./Product");
var server_1 = require("./server");
var productApi = function () {
    var routerProducts = express_1.default.Router();
    server_1.app.use("/productos", routerProducts);
    var checkIdProduct = function (req, res, next) {
        var id = parseInt(req.params.id, 10);
        var productById = server_1.productLogic.getProductsById(id);
        if (id) {
            if ((productById === null || productById === void 0 ? void 0 : productById.id) === id) {
                res.status(200).json(productById);
            }
            else {
                res.status(404).json({ error: "este producto no esta cargado" });
            }
        }
        else {
            next();
        }
    };
    routerProducts.get("/listar/:id?", checkIdProduct, function (_, res) {
        var products = server_1.productLogic.getProducts();
        if (products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json({ error: "no hay productos cargados" });
        }
    });
    routerProducts.post("/agregar", function (req, res) {
        if (server_1.isAdmin) {
            var newProduct = new Product_1.Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
            server_1.productLogic.addProducts(newProduct);
            server_1.io.sockets.emit("products", server_1.productLogic.getProducts());
            res.status(200).json({ server: "Producto creado" });
        }
        else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/agregar metodo POST no autorizado",
            });
        }
    });
    routerProducts.put("/actualizar/:id", function (req, res) {
        if (server_1.isAdmin) {
            var id = parseInt(req.params.id, 10);
            var newProduct = new Product_1.Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
            if (newProduct) {
                res.status(200).json(server_1.productLogic.updateProduct(newProduct, id));
                server_1.io.sockets.emit("products", server_1.productLogic.getProducts());
            }
            else {
                res.status(404).json({ error: "producto no encontrado" });
            }
        }
        else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/actualizar/" + req.params.id + " metodo PUT no autorizado",
            });
        }
    });
    routerProducts.delete("/borrar/:id", function (req, res) {
        if (server_1.isAdmin) {
            var id = parseInt(req.params.id, 10);
            var productToBeDelete = server_1.productLogic.getProductsById(id);
            if (productToBeDelete) {
                res.status(200).json(server_1.productLogic.deleteProduct(productToBeDelete));
                server_1.io.sockets.emit("products", server_1.productLogic.getProducts());
            }
            else {
                res
                    .status(404)
                    .json({ error: "producto no existente, no se puede borrar" });
            }
        }
        else {
            res.status(403).json({
                error: -1,
                descripcion: "ruta /productos/borrar/" + req.params.id + " metodo DELETE no autorizado",
            });
        }
    });
};
exports.productApi = productApi;
