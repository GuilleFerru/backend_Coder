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
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var ApiProductos = require('../api/productos');
var ControladorProductos = /** @class */ (function () {
    function ControladorProductos() {
        var _this = this;
        this.getVistaTest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cant, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cant = Number(req.query.cant);
                        return [4 /*yield*/, this.apiProductos.getVistaTest(cant)];
                    case 1:
                        resultado = _a.sent();
                        if (!resultado) {
                            res.status(404).json({ error: "este producto no esta cargado" });
                        }
                        else {
                            return [2 /*return*/, res.status(200).json(resultado)];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getProductos = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.params.id);
                        return [4 /*yield*/, this.apiProductos.getProductos(id)];
                    case 1:
                        resultado = _a.sent();
                        if (!resultado) {
                            res.status(404).json({ error: "este producto no esta cargado" });
                        }
                        else {
                            return [2 /*return*/, res.status(200).json(resultado)];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.postProducto = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var producto, resultado, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!app_1.newSession.getIsAdmin()) return [3 /*break*/, 5];
                        producto = req.body;
                        return [4 /*yield*/, this.apiProductos.postProducto(producto)];
                    case 1:
                        resultado = _d.sent();
                        if (!!resultado) return [3 /*break*/, 2];
                        res.status(404).json({ error: "este producto no se pudo guardar" });
                        return [3 /*break*/, 4];
                    case 2:
                        _b = (_a = app_1.io.sockets).emit;
                        _c = ["products"];
                        return [4 /*yield*/, this.apiProductos.getProductos()];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        res.status(201).json({ server: "Producto creado" });
                        return [2 /*return*/, resultado];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(403).json({
                            error: -1,
                            descripcion: "ruta /productos/agregar metodo POST no autorizado",
                        });
                        _d.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.putProducto = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, producto, resultado, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!app_1.newSession.getIsAdmin()) return [3 /*break*/, 5];
                        id = (req.params.id);
                        producto = req.body;
                        return [4 /*yield*/, this.apiProductos.putProducto(id, producto)];
                    case 1:
                        resultado = _d.sent();
                        if (!!resultado) return [3 /*break*/, 2];
                        res.status(204).json({ error: "producto no encontrado" });
                        return [3 /*break*/, 4];
                    case 2:
                        res.status(200).json(resultado);
                        _b = (_a = app_1.io.sockets).emit;
                        _c = ["products"];
                        return [4 /*yield*/, this.apiProductos.getProductos()];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(403).json({
                            error: -1,
                            descripcion: "ruta /productos/actualizar/" + req.params.id + " metodo PUT no autorizado",
                        });
                        _d.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProducto = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, resultado, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!app_1.newSession.getIsAdmin()) return [3 /*break*/, 5];
                        id = req.params.id;
                        return [4 /*yield*/, this.apiProductos.deleteProducto(id)];
                    case 1:
                        resultado = _d.sent();
                        if (!!resultado) return [3 /*break*/, 2];
                        res.status(404).json({ error: "producto no existente, no se puede borrar" });
                        return [3 /*break*/, 4];
                    case 2:
                        _b = (_a = app_1.io.sockets).emit;
                        _c = ["products"];
                        return [4 /*yield*/, this.apiProductos.getProductos()];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        res.status(200).json({ server: "Producto borrado" });
                        _d.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(403).json({
                            error: -1,
                            descripcion: "ruta /productos/borrar/" + req.params.id + " metodo DELETE no autorizado",
                        });
                        _d.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.apiProductos = new ApiProductos();
    }
    return ControladorProductos;
}());
module.exports = ControladorProductos;
