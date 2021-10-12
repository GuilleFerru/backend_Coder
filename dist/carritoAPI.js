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
exports.carritoAPI = void 0;
var express_1 = __importDefault(require("express"));
var server_1 = require("./server");
var main_1 = require("./main");
var carritoAPI = function () {
    var carritoProducts = express_1.default.Router();
    server_1.app.use("/carrito", carritoProducts);
    carritoProducts.post("/agregar/:id_producto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, productoById, carrrito, cartToBeUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id_producto;
                    return [4 /*yield*/, main_1.dao.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (!productoById) return [3 /*break*/, 10];
                    return [4 /*yield*/, main_1.dao.getCarrito()];
                case 2:
                    carrrito = _a.sent();
                    if (!(carrrito.length > 0)) return [3 /*break*/, 7];
                    cartToBeUpdate = carrrito.find(function (cart) { var _a; return String((_a = cart.producto) === null || _a === void 0 ? void 0 : _a._id) === id; });
                    if (!cartToBeUpdate) return [3 /*break*/, 4];
                    return [4 /*yield*/, main_1.dao.updateQtyInCarrito(cartToBeUpdate)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, main_1.dao.insertProductToCarrito(productoById)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, main_1.dao.insertProductToCarrito(productoById)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    res.status(200).json({ server: "Producto agregado al carrito" });
                    return [3 /*break*/, 11];
                case 10:
                    res.status(404).json({ error: "producto no encontrado" });
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    }); });
    var checkIdProductInCarrito = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, carrito;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, main_1.dao.getCarritoById(id)];
                case 1:
                    carrito = _a.sent();
                    if (carrito) {
                        if ((carrito === null || carrito === void 0 ? void 0 : carrito._id) === id) {
                            res.status(200).json(carrito.producto);
                        }
                        else {
                            res.status(404).json({ error: "este producto no esta cargado en el carrito" });
                        }
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    carritoProducts.get("/listar/:id?", checkIdProductInCarrito, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
        var carritos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main_1.dao.getCarrito()];
                case 1:
                    carritos = _a.sent();
                    res.status(200).json(carritos);
                    return [2 /*return*/];
            }
        });
    }); });
    carritoProducts.post("/agregar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = req.body;
                    return [4 /*yield*/, main_1.dao.insertOrder(order)
                        // io.sockets.emit("products", await dao.getProductos());
                    ];
                case 1:
                    _a.sent();
                    // io.sockets.emit("products", await dao.getProductos());
                    res.status(200).json({ server: "Compra finalizada" });
                    return [2 /*return*/];
            }
        });
    }); });
    carritoProducts.delete("/borrar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, cartToBeDelete, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, main_1.dao.getCarritoById(id)];
                case 1:
                    cartToBeDelete = _f.sent();
                    if (!cartToBeDelete) return [3 /*break*/, 4];
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, main_1.dao.deleteCarrito(cartToBeDelete._id)];
                case 2:
                    _b.apply(_a, [_f.sent()]);
                    _d = (_c = server_1.io.sockets).emit;
                    _e = ["carts"];
                    return [4 /*yield*/, main_1.dao.getCarrito()];
                case 3:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [3 /*break*/, 5];
                case 4:
                    res.status(404).json({ error: "carrito no existente, no se puede borrar" });
                    _f.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
exports.carritoAPI = carritoAPI;
