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
    function Product(title, price, thumbnail) {
        this.id = 0;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    return Product;
}());
var ProductLogic = /** @class */ (function () {
    function ProductLogic() {
        this.products = new Array();
        this.count = 0;
    }
    ProductLogic.prototype.getProductos = function () {
        return this.products;
    };
    ProductLogic.prototype.getProductoById = function (id) {
        return this.products.find(function (element) { return element.id === id; });
    };
    ProductLogic.prototype.addProducto = function (product) {
        console.log(product);
        this.products.push(__assign(__assign({}, product), { id: this.count + 1 }));
        this.count++;
        return product;
    };
    ProductLogic.prototype.updateProducto = function (newProducto, id) {
        return (this.products[id - 1] = __assign(__assign({}, newProducto), { id: id }));
    };
    ProductLogic.prototype.deleteProducto = function (productToBeDelete) {
        var index = this.products.indexOf(productToBeDelete);
        this.products.splice(index, 1);
        return productToBeDelete;
    };
    return ProductLogic;
}());
//////////////////////////////////////////////////////////////////////////////
var productLogic = new ProductLogic();
// const product = new Productos();
var fileName = "./messages.txt";
var messages = [];
app.use(express_1.default.static("./public"));
app.get("/", function (req, res) {
    return res.sendFile("index.html", { root: __dirname });
});
io.on("connection", function (socket) {
    socket.emit("loadProducts", productLogic.getProductos());
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
// const getTablaRows = (req: Request, _: Response, next) => {
//   req.productos = producto.getProductos();
//   if (req.productos.length > 0) {
//     req.errorData = true;
//   } else {
//     req.errorData = false;
//   }
//   next();
// };
// const getTablaHeaders = (req: Request, _: Response, next) => {
//   req.productosKeys = ["Nombre", "Precio", "Foto"];
//   next();
// };
// app.get("/productos/vista", getTablaRows, getTablaHeaders, (req, res) => {
//   const { productos, productosKeys, errorData } = req;
//   if (productos.length > 0) {
//     res.render("listOfProducts.hbs", {
//       productos: productos,
//       productosKeys: productosKeys,
//       dataOk: true,
//       buttonHref: "/",
//       buttonDescription: "Volver",
//     });
//   } else {
//     res.render("listOfProducts.hbs", {
//       dataOk: errorData,
//       wrongTitle: "No existen productos cargados",
//       wrongDescription:
//         "Para visualizar los productos primero los debe registrar.",
//       buttonHref: "/",
//       buttonDescription: "Cargar Producto",
//     });
//   }
// });
var routerAPI = express_1.default.Router();
app.use("/api", routerAPI);
routerAPI.get("/productos/listar", function (_, res) {
    var products = productLogic.getProductos();
    if (products.length > 0) {
        res.status(200).json(products);
    }
    else {
        res.status(404).json({ error: "no hay productos cargados" });
    }
});
// routerAPI.get("/productos/listar/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const newProducto = producto.getProductoById(id);
//   if (newProducto) {
//     res.status(200).json(newProducto);
//   } else {
//     res.status(404).json({ error: "producto no encontrado" });
//   }
// });
routerAPI.post("/productos/guardar", function (req, res) {
    var newProduct = new Product(req.body.title, req.body.price, req.body.thumbnail);
    productLogic.addProducto(newProduct);
    io.sockets.emit("loadProducts", productLogic.getProductos());
    res.redirect(302, "/");
    // if (newProducto.price && newProducto.title && newProducto.thumbnail) {
    //   producto.addProducto(newProducto);
    //   ioServer.sockets.emit("loadProducts", producto.getProductos());
    //   res.redirect(302, "/");
    // } else {
    //   res.status(400).json({ error: "Producto mal cargado" });
    // }
});
// routerAPI.put("/productos/actualizar/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const newProducto = {
//     title: req.body.title,
//     price: req.body.price,
//     thumbnail: req.body.thumbnail,
//   };
//   if (newProducto) {
//     res.status(200).json(producto.updateProducto(newProducto, id, req));
//   } else {
//     res.status(404).json({ error: "producto no encontrado" });
//   }
// });
// routerAPI.delete("/productos/borrar/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const productToBeDelete = producto.getProductoById(id);
//   if (productToBeDelete) {
//     res.status(200).json(producto.deleteProducto(productToBeDelete));
//   } else {
//     res
//       .status(404)
//       .json({ error: "producto no existente, no se puede borrar" });
//   }
// });
