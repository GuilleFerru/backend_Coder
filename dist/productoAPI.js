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
exports.productoAPI = void 0;
var express_1 = __importDefault(require("express"));
var IProducto_1 = require("./interfaces/IProducto");
var server_1 = require("./server");
var main_1 = require("./main");
var productoTest_1 = require("./productoTest");
var productoAPI = function () {
    var routerProducts = express_1.default.Router();
    server_1.app.use("/productos", routerProducts);
    routerProducts.get("/vista-test/", function (req, res) {
        var cant = Number(req.query.cant);
        var cantidadAGenerar = isNaN(cant) ? 10 : cant;
        var fakeProductos = (0, productoTest_1.generateData)(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            res.status(200).json(fakeProductos);
        }
        else {
            res.status(200).json({ error: "no hay productos cargados" });
        }
    });
    var checkIdProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productoById;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (req.params.id);
                    return [4 /*yield*/, main_1.dao.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (productoById) {
                        if (String(productoById._id) === id) {
                            res.status(200).json(productoById);
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
                case 0: return [4 /*yield*/, main_1.dao.getProductos()];
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
        var newProducto, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!server_1.isAdmin) return [3 /*break*/, 3];
                    newProducto = new IProducto_1.Producto(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                    return [4 /*yield*/, main_1.dao.insertProducto(newProducto)];
                case 1:
                    _d.sent();
                    _b = (_a = server_1.io.sockets).emit;
                    _c = ["products"];
                    return [4 /*yield*/, main_1.dao.getProductos()];
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
        var id, newProducto, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!server_1.isAdmin) return [3 /*break*/, 5];
                    id = (req.params.id);
                    newProducto = new IProducto_1.Producto(req.body.title, req.body.description, req.body.code, req.body.thumbnail, req.body.price, req.body.stock);
                    if (!newProducto) return [3 /*break*/, 3];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, main_1.dao.updateProducto(id, newProducto)];
                case 1:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = server_1.io.sockets).emit;
                    _e = ["products"];
                    return [4 /*yield*/, main_1.dao.getProductos()];
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
                    if (!server_1.isAdmin) return [3 /*break*/, 6];
                    id = req.params.id;
                    return [4 /*yield*/, main_1.dao.getProductoById(id)];
                case 1:
                    productToBeDelete = _f.sent();
                    if (!productToBeDelete) return [3 /*break*/, 4];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, main_1.dao.deleteProducto(productToBeDelete._id)];
                case 2:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = server_1.io.sockets).emit;
                    _e = ["products"];
                    return [4 /*yield*/, main_1.dao.getProductos()];
                case 3:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [3 /*break*/, 5];
                case 4:
                    res
                        .status(404)
                        .json({ error: "producto no existente, no se puede borrar" });
                    _f.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.status(403).json({
                        error: -1,
                        descripcion: "ruta /productos/borrar/" + req.params.id + " metodo DELETE no autorizado",
                    });
                    _f.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); });
};
exports.productoAPI = productoAPI;
