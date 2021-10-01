"use strict";
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
exports.productApi = void 0;
var express_1 = __importDefault(require("express"));
var Product_1 = require("./Product");
var server_1 = require("./server");
var productosDB_1 = require("./productosDB");
var productApi = function () {
    var routerProducts = express_1.default.Router();
    server_1.app.use("/productos", routerProducts);
    var checkIdProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var code, productById;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    code = (req.params.id);
                    return [4 /*yield*/, (0, productosDB_1.loadProductByIdFromDB)(code)];
                case 1:
                    productById = _b.sent();
                    if (code) {
                        if (((_a = productById[0]) === null || _a === void 0 ? void 0 : _a.code) === code) {
                            res.status(200).json(productById);
                        }
                        else {
                            res.status(404).json({ error: "este producto no esta cargado" });
                        }
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    routerProducts.get("/listar/:id?", checkIdProduct, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, productosDB_1.loadProductsFromDB)()];
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
                    if (!server_1.isAdmin) return [3 /*break*/, 3];
                    newProduct = new Product_1.Product(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                    return [4 /*yield*/, (0, productosDB_1.saveProductsToDB)(newProduct)];
                case 1:
                    _d.sent();
                    _b = (_a = server_1.io.sockets).emit;
                    _c = ["products"];
                    return [4 /*yield*/, (0, productosDB_1.loadProductsFromDB)()];
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
        // if (isAdmin) {
        //     const id: number = parseInt(req.params.id, 10);
        //     const productToBeDelete = productLogic.getProductsById(id);
        //     if (productToBeDelete) {
        //         res.status(200).json(productLogic.deleteProduct(productToBeDelete));
        //         io.sockets.emit("products", productLogic.getProducts());
        //     } else {
        //         res
        //             .status(404)
        //             .json({ error: "producto no existente, no se puede borrar" });
        //     }
        // } else {
        //     res.status(403).json({
        //         error: -1,
        //         descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
        //     });
        // }
    });
};
exports.productApi = productApi;
