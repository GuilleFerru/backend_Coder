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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var SocketIO = __importStar(require("socket.io"));
var SQLite3_1 = require("./SQLite3");
var mariaDB_1 = require("./mariaDB");
var app = (0, express_1.default)();
var port = 8080;
var messages = [];
var isAdmin = true;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var server = app.listen(port, function () {
    console.info("Servidor listo en el puerto " + port);
});
server.on("error", function (error) {
    console.error(error);
});
var io = new SocketIO.Server(server);
////////////////////////////////////////////////////////////////////
var Product = /** @class */ (function () {
    function Product(title, description, code, thumbnail, price, stock) {
        this.id = 0;
        this.timestamp = 0;
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.price = price;
        this.stock = stock;
    }
    return Product;
}());
var ProductLogic = /** @class */ (function () {
    function ProductLogic() {
        var _this = this;
        this.loadProducts = function (products) {
            _this.products = products;
        };
        this.products = new Array();
    }
    ProductLogic.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knex, productosFromDB, _i, productosFromDB_1, producto, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(mariaDB_1.optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, knex.from("productos").select("*")];
                    case 2:
                        productosFromDB = _a.sent();
                        this.products = [];
                        for (_i = 0, productosFromDB_1 = productosFromDB; _i < productosFromDB_1.length; _i++) {
                            producto = productosFromDB_1[_i];
                            this.products.push(producto);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw error_1;
                    case 4:
                        knex.destroy();
                        return [2 /*return*/, this.products];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductLogic.prototype.getProductsById = function (id) {
        return this.products.find(function (element) { return element.id === id; });
    };
    ProductLogic.prototype.addProducts = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(mariaDB_1.optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, knex("productos").insert([
                                {
                                    timestamp: Date.now(),
                                    title: product.title,
                                    description: product.description,
                                    code: product.code,
                                    thumbnail: product.thumbnail,
                                    price: product.price,
                                    stock: product.stock,
                                },
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 4:
                        knex.destroy();
                        return [2 /*return*/, this.products];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductLogic.prototype.updateProduct = function (newProduct, id) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(mariaDB_1.optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, knex.from("productos").where("id", id).update({
                                title: newProduct.title,
                                description: newProduct.description,
                                code: newProduct.code,
                                thumbnail: newProduct.thumbnail,
                                price: newProduct.price,
                                stock: newProduct.stock
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw error_3;
                    case 4:
                        knex.destroy();
                        return [2 /*return*/, (this.products[id - 1] = __assign(__assign({}, newProduct), { id: id }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductLogic.prototype.deleteProduct = function (productToBeDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var knex, index, id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex = require("knex")(mariaDB_1.optionsMariaDB);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        index = this.products.indexOf(productToBeDelete);
                        id = productToBeDelete.id;
                        return [4 /*yield*/, knex.from("productos").where("id", id).del()];
                    case 2:
                        _a.sent();
                        this.products.splice(index, 1);
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw error_4;
                    case 4:
                        knex.destroy();
                        return [2 /*return*/, productToBeDelete];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductLogic;
}());
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
var productLogic = new ProductLogic();
var cartLogic = new CartLogic();
/* FS  */ //////////////////////////////////////////////////////////////////////
/*  read file de chat */
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var knex, mensajes, savedMessages, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                knex = require("knex")(SQLite3_1.optionsSQLite);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, knex.from("mensajes").select("*")];
            case 2:
                mensajes = _a.sent();
                savedMessages = mensajes;
                savedMessages.forEach(function (message) {
                    messages.push(message);
                });
                return [3 /*break*/, 5];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                throw error_5;
            case 4:
                knex.destroy();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); })();
var saveMessages = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var knex, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                knex = require("knex")(SQLite3_1.optionsSQLite);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, knex("mensajes").insert([
                        {
                            author: message.author,
                            date: message.date,
                            text: message.text,
                        },
                    ])];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                throw error_6;
            case 4:
                knex.destroy();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
/* sockets */ /////////////////////////////////////////////////////////////////////////////////
app.use(express_1.default.static("./public"));
app.get("/", function (_, res) {
    return res.sendFile("index.html", { root: __dirname });
});
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                // socket.emit("loadProducts", productLogic.getProducts());
                socket.emit("messages", messages);
                _b = (_a = socket).emit;
                _c = ["products"];
                return [4 /*yield*/, productLogic.getProducts()];
            case 1:
                _b.apply(_a, _c.concat([_d.sent(), isAdmin]));
                socket.on("newMessage", function (message) {
                    messages.push(message);
                    io.sockets.emit("messages", messages);
                    saveMessages(message);
                });
                return [2 /*return*/];
        }
    });
}); });
/* PRODUCTOS API */ /////////////////////////////////////////////////////////////////////////
var routerProducts = express_1.default.Router();
app.use("/productos", routerProducts);
var carritoProducts = express_1.default.Router();
app.use("/carrito", carritoProducts);
var checkIdProduct = function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var productById = productLogic.getProductsById(id);
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
routerProducts.get("/listar/:id?", checkIdProduct, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productLogic.getProducts()];
            case 1:
                products = _a.sent();
                if (products.length > 0) {
                    res.status(200).json(products);
                }
                else {
                    res.status(404).json({ error: "no hay productos cargados" });
                }
                return [2 /*return*/];
        }
    });
}); });
routerProducts.post("/agregar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newProduct, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!isAdmin) return [3 /*break*/, 3];
                newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                return [4 /*yield*/, productLogic.addProducts(newProduct)];
            case 1:
                _d.sent();
                _b = (_a = io.sockets).emit;
                _c = ["products"];
                return [4 /*yield*/, productLogic.getProducts()];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                res.status(200).json({ server: "Producto creado" });
                return [3 /*break*/, 4];
            case 3:
                res.status(403).json({
                    error: -1,
                    descripcion: "ruta /productos/agregar metodo POST no autorizado",
                });
                _d.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
routerProducts.put("/actualizar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newProduct, _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!isAdmin) return [3 /*break*/, 5];
                id = parseInt(req.params.id, 10);
                newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                if (!newProduct) return [3 /*break*/, 3];
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, productLogic.updateProduct(newProduct, id)];
            case 1:
                _b.apply(_a, [_f.sent()]);
                _d = (_c = io.sockets).emit;
                _e = ["products"];
                return [4 /*yield*/, productLogic.getProducts()];
            case 2:
                _d.apply(_c, _e.concat([_f.sent()]));
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ error: "producto no encontrado" });
                _f.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(403).json({
                    error: -1,
                    descripcion: "ruta /productos/actualizar/" + req.params.id + " metodo PUT no autorizado",
                });
                _f.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
routerProducts.delete("/borrar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productToBeDelete, _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!isAdmin) return [3 /*break*/, 5];
                id = parseInt(req.params.id, 10);
                productToBeDelete = productLogic.getProductsById(id);
                if (!productToBeDelete) return [3 /*break*/, 3];
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, productLogic.deleteProduct(productToBeDelete)];
            case 1:
                _b.apply(_a, [_f.sent()]);
                _d = (_c = io.sockets).emit;
                _e = ["products"];
                return [4 /*yield*/, productLogic.getProducts()];
            case 2:
                _d.apply(_c, _e.concat([_f.sent()]));
                return [3 /*break*/, 4];
            case 3:
                res
                    .status(404)
                    .json({ error: "producto no existente, no se puede borrar" });
                _f.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(403).json({
                    error: -1,
                    descripcion: "ruta /productos/borrar/" + req.params.id + " metodo DELETE no autorizado",
                });
                _f.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
/* CARRITO API */ ///////////////////////////////////////////////////////////////////////////////////////
carritoProducts.post("/agregar/:id_producto", function (req, res) {
    var id = parseInt(req.params.id_producto, 10);
    var productById = productLogic.getProductsById(id);
    if (productById) {
        var carts = cartLogic.getCart();
        if (carts.length > 0) {
            var cartToBeUpdate = carts.find(function (cart) { var _a; return ((_a = cart.product) === null || _a === void 0 ? void 0 : _a.id) === id; });
            if (cartToBeUpdate) {
                cartLogic.updateQtyInCart(cartToBeUpdate);
            }
            else {
                cartLogic.addProductToCart(productById);
            }
        }
        else {
            cartLogic.addProductToCart(productById);
        }
        res.status(200).json({ server: "Producto agregado al carrito" });
    }
    else {
        res.status(404).json({ error: "producto no encontrado" });
    }
});
var checkIdProductInCarrito = function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var cart = cartLogic.getCartById(id);
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
    var carritos = cartLogic.getCart();
    res.status(200).json(carritos);
});
carritoProducts.delete("/borrar/:id", function (req, res) {
    var id = parseInt(req.params.id, 10);
    var cartToBeDelete = cartLogic.getCartById(id);
    if (cartToBeDelete) {
        res.status(200).json(cartLogic.deleteCart(cartToBeDelete));
        io.sockets.emit("carts", cartLogic.getCart());
    }
    else {
        res.status(404).json({ error: "carrito no existente, no se puede borrar" });
    }
});
