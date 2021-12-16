"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = void 0;
var IProducto_1 = require("../interfaces/IProducto");
var faker = __importStar(require("faker"));
var dalProductos = require("../persistencia/dalProductos");
var generateData = function (cantidadAGenerar) {
    var productoTest = [];
    for (var i = 0; i < cantidadAGenerar; i++) {
        var newProducto = new IProducto_1.Producto(faker.commerce.productName(), faker.commerce.productDescription(), faker.commerce.productAdjective(), faker.image.image(), Number(faker.commerce.price()), Number(faker.commerce.price()));
        productoTest.push(newProducto);
    }
    return productoTest;
};
exports.generateData = generateData;
module.exports = {
    getVistaTest: function (cant) {
        var cantidadAGenerar = isNaN(cant) ? 10 : cant;
        var fakeProductos = (0, exports.generateData)(cantidadAGenerar);
        if (fakeProductos.length > 0) {
            return fakeProductos;
        }
        else {
            return false;
        }
    },
    getProductos: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var productoById, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dalProductos.getProductoById(id)];
                case 1:
                    productoById = _a.sent();
                    if (!productoById) return [3 /*break*/, 2];
                    if (String(productoById._id) === id) {
                        return [2 /*return*/, productoById];
                    }
                    else {
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, dalProductos.getProductos()];
                case 3:
                    products = _a.sent();
                    if (products.length > 0) {
                        return [2 /*return*/, products];
                    }
                    else {
                        return [2 /*return*/, ''];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); },
    postProducto: function (producto) { return __awaiter(void 0, void 0, void 0, function () {
        var newProducto, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newProducto = new IProducto_1.Producto(producto.title, producto.description, producto.code, producto.thumbnail, producto.price, producto.stock);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dalProductos.insertProducto(newProducto)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    putProducto: function (id, producto) { return __awaiter(void 0, void 0, void 0, function () {
        var newProducto, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newProducto = new IProducto_1.Producto(producto.title, producto.description, producto.code, producto.thumbnail, producto.price, producto.stock);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dalProductos.updateProducto(id, newProducto)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    deleteProducto: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var productToBeDelete, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    productToBeDelete = dalProductos.getProductoById(id);
                    if (!productToBeDelete) return [3 /*break*/, 2];
                    return [4 /*yield*/, dalProductos.deleteProducto(productToBeDelete)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2: return [2 /*return*/, false];
                case 3:
                    error_3 = _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
