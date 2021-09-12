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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var SocketIO = __importStar(require("socket.io"));
var fs = __importStar(require("fs"));
var app = (0, express_1.default)();
var port = 8080;
var fileName = "./messages.txt";
var messages = [];
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
    // private timestamp: number;
    function ProductLogic() {
        this.products = new Array();
        this.count = 0;
    }
    ProductLogic.prototype.getProducts = function () {
        return this.products;
    };
    ProductLogic.prototype.getProductsById = function (id) {
        return this.products.find(function (element) { return element.id === id; });
    };
    ProductLogic.prototype.addProducts = function (product) {
        this.products.push(__assign(__assign({}, product), { id: this.count + 1, timestamp: Date.now() }));
        this.count++;
        return product;
    };
    ProductLogic.prototype.updateProduct = function (newProduct, id) {
        return (this.products[id - 1] = __assign(__assign({}, newProduct), { id: id }));
    };
    ProductLogic.prototype.deleteProduct = function (productToBeDelete) {
        var index = this.products.indexOf(productToBeDelete);
        this.products.splice(index, 1);
        return productToBeDelete;
    };
    return ProductLogic;
}());
//////////////////////////////////////////////////////////////////////////////
var Cart = /** @class */ (function () {
    function Cart(id, timestamp, product) {
        this.id = 0;
        this.timestamp = 0;
        this.id = id;
        this.timestamp = timestamp;
        this.product = product;
    }
    return Cart;
}());
var CartLogic = /** @class */ (function () {
    function CartLogic() {
        this.cart = new Array();
    }
    CartLogic.prototype.getCart = function () {
        return this.cart;
    };
    CartLogic.prototype.getProductInCartById = function (id) {
        this.cart[0].product.map(function (product) {
        });
        return this.cart.find(function (element) {
            element.id === id;
        });
    };
    CartLogic.prototype.addProductToCart = function (cart) {
        this.cart = [];
        this.cart.push(cart);
        return this.cart;
    };
    CartLogic.prototype.deleteCart = function (cartToBeDelete) {
        var index = this.cart.indexOf(cartToBeDelete);
        this.cart.splice(index, 1);
        return cartToBeDelete;
    };
    return CartLogic;
}());
/* socket chat */ /////////////////////////////////////////////////////////////////////////////////
var productLogic = new ProductLogic();
var cartLogic = new CartLogic();
app.use(express_1.default.static("./public"));
app.get("/", function (_, res) {
    return res.sendFile("index.html", { root: __dirname });
});
io.on("connection", function (socket) {
    socket.emit("loadProducts", productLogic.getProducts());
    socket.emit("messages", messages);
    socket.on("newMessage", function (message) {
        messages.push(message);
        io.sockets.emit("messages", messages);
        saveMessages(messages);
    });
});
(function () {
    fs.readFile(fileName, "utf8", function (error, content) {
        if (error) {
            console.error("Hubo un error con fs.readFile!");
        }
        else {
            var savedMessages = JSON.parse(content);
            savedMessages.forEach(function (message) {
                messages.push(message);
            });
        }
    });
})();
var saveMessages = function (messages) {
    try {
        fs.writeFileSync(fileName, JSON.stringify(messages, null, "\t"));
    }
    catch (error) {
        console.log("Hubo un error");
    }
};
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
routerProducts.get("/listar/:id?", checkIdProduct, function (_, res) {
    var products = productLogic.getProducts();
    if (products.length > 0) {
        res.status(200).json(products);
    }
    else {
        res.status(404).json({ error: "no hay productos cargados" });
    }
});
routerProducts.post("/agregar", function (req, res) {
    var newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
    productLogic.addProducts(newProduct);
    io.sockets.emit("loadProducts", productLogic.getProducts());
    res.status(200).json({ server: "Producto creado" });
});
routerProducts.put("/actualizar/:id", function (req, res) {
    var id = parseInt(req.params.id, 10);
    var newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
    if (newProduct) {
        res.status(200).json(productLogic.updateProduct(newProduct, id));
        io.sockets.emit("loadProducts", productLogic.getProducts());
    }
    else {
        res.status(404).json({ error: "producto no encontrado" });
    }
});
routerProducts.delete("/borrar/:id", function (req, res) {
    var id = parseInt(req.params.id, 10);
    var productToBeDelete = productLogic.getProductsById(id);
    if (productToBeDelete) {
        res.status(200).json(productLogic.deleteProduct(productToBeDelete));
        io.sockets.emit("loadProducts", productLogic.getProducts());
    }
    else {
        res
            .status(404)
            .json({ error: "producto no existente, no se puede borrar" });
    }
});
/* CARRITO API */ ////////////////////////////////////////////////////////////////////////////////////////
var productsInCart = Array();
carritoProducts.post("/agregar/:id_producto", function (req, res) {
    var id = parseInt(req.params.id_producto, 10);
    var productById = productLogic.getProductsById(id);
    if (productById) {
        productsInCart.push(productById);
        var id_1 = Math.floor(Math.random() * Math.pow(10, 15));
        var newCarrito = new Cart(id_1, Date.now(), productsInCart);
        cartLogic.addProductToCart(newCarrito);
        res.status(200).json({ server: "Producto agregado al carrito" });
    }
    else {
        res.status(404).json({ error: "producto no encontrado" });
    }
});
var checkIdProductInCarrito = function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var cartProduct = cartLogic.getProductInCartById(id);
    if (id) {
        if ((cartProduct === null || cartProduct === void 0 ? void 0 : cartProduct.id) === id) {
            res.status(200).json(cartProduct);
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
    var cartToBeDelete = cartLogic.getProductInCartById(id);
    if (cartToBeDelete) {
        res.status(200).json(cartLogic.deleteCart(cartToBeDelete));
    }
    else {
        res.status(404).json({ error: "carrito no existente, no se puede borrar" });
    }
});
