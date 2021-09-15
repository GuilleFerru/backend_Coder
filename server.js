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
// const fileName: string = "./messages.txt";
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
    function ProductLogic() {
        var _this = this;
        this.loadProducts = function (products) {
            _this.products = products;
        };
        this.saveProducts = function (products) {
            try {
                fs.writeFileSync('./productos.txt', JSON.stringify(products, null, "\t"));
            }
            catch (error) {
                console.log("Hubo un error");
            }
        };
        this.products = new Array();
    }
    ProductLogic.prototype.getProducts = function () {
        return this.products;
    };
    ProductLogic.prototype.getProductsById = function (id) {
        return this.products.find(function (element) { return element.id === id; });
    };
    ProductLogic.prototype.addProducts = function (product) {
        var lastProductId = this.products[this.products.length - 1].id;
        this.products.push(__assign(__assign({}, product), { id: lastProductId + 1, timestamp: Date.now() }));
        this.saveProducts(this.products);
        return product;
    };
    ProductLogic.prototype.updateProduct = function (newProduct, id) {
        return (this.products[id - 1] = __assign(__assign({}, newProduct), { id: id }));
    };
    ProductLogic.prototype.deleteProduct = function (productToBeDelete) {
        var index = this.products.indexOf(productToBeDelete);
        this.products.splice(index, 1);
        this.saveProducts(this.products);
        return productToBeDelete;
    };
    return ProductLogic;
}());
//////////////////////////////////////////////////////////////////////////////
var Cart = /** @class */ (function () {
    function Cart() {
        this.id = 0;
        this.timestamp = 0;
    }
    return Cart;
}());
var CartLogic = /** @class */ (function () {
    function CartLogic() {
        this.count = 0;
        this.timestamp = Date.now();
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
            timestamp: this.timestamp,
            product: product
        });
        this.count++;
        return this.cart;
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
/* Se autoejecuta y me carga los productos guardados en productos.txt */
(function () {
    fs.readFile('./productos.txt', "utf8", function (error, content) {
        if (error) {
            console.error("Hubo un error con fs.readFile de producto!");
        }
        else {
            var products_1 = [];
            var savedProducts = JSON.parse(content);
            savedProducts.forEach(function (product) {
                products_1.push(product);
            });
            productLogic.loadProducts(products_1);
        }
    });
})();
/*  read file de chat */
(function () {
    fs.readFile('./messages.txt', "utf8", function (error, content) {
        if (error) {
            console.error("Hubo un error con fs.readFile de msj!");
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
        fs.writeFileSync('./messages.txt', JSON.stringify(messages, null, "\t"));
    }
    catch (error) {
        console.log("Hubo un error");
    }
};
/* sockets */ /////////////////////////////////////////////////////////////////////////////////
app.use(express_1.default.static("./public"));
app.get("/", function (_, res) {
    return res.sendFile("index.html", { root: __dirname });
});
io.on("connection", function (socket) {
    // socket.emit("loadProducts", productLogic.getProducts());
    socket.emit("messages", messages);
    socket.emit("products", productLogic.getProducts());
    socket.on("newMessage", function (message) {
        messages.push(message);
        io.sockets.emit("messages", messages);
        saveMessages(messages);
    });
});
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
    io.sockets.emit("products", productLogic.getProducts());
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
        io.sockets.emit("products", productLogic.getProducts());
    }
    else {
        res
            .status(404)
            .json({ error: "producto no existente, no se puede borrar" });
    }
});
/* CARRITO API */ ////////////////////////////////////////////////////////////////////////////////////////
carritoProducts.post("/agregar/:id_producto", function (req, res) {
    var id = parseInt(req.params.id_producto, 10);
    var productById = productLogic.getProductsById(id);
    if (productById) {
        cartLogic.addProductToCart(productById);
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
    }
    else {
        res.status(404).json({ error: "carrito no existente, no se puede borrar" });
    }
});
