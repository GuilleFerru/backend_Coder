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
var supertest_1 = __importDefault(require("supertest"));
var chai_1 = require("chai");
var app_1 = require("../app");
describe("TEST API PRODUCTOS", function () {
    describe("GET", function () {
        it("deberia retornar un estado 200", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/productos/listar")];
                    case 1:
                        response = _a.sent();
                        (0, chai_1.expect)(response.status).to.eql(200);
                        response.body.forEach(function (element) {
                            (0, chai_1.expect)(element._id).to.be.a("string");
                            (0, chai_1.expect)(element.title).to.be.a("string");
                            (0, chai_1.expect)(element.description).to.be.a("string");
                            (0, chai_1.expect)(element.code).to.be.a("string");
                            (0, chai_1.expect)(element.thumbnail).to.be.a("string");
                            (0, chai_1.expect)(element.price).to.be.a("number");
                            (0, chai_1.expect)(element.stock).to.be.a("number");
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST", function () {
        it("deberia incorporar un producto y retornar un estado 201 y una response.body { server: 'Producto creado' }", function () { return __awaiter(void 0, void 0, void 0, function () {
            var producto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        producto = {
                            title: 'Mocha Chai y Supertest',
                            description: 'Mocha Chai y Supertest re locos',
                            code: 'mochasup',
                            thumbnail: 'https://www.paradigmadigital.com/wp-content/uploads/2017/02/1.png',
                            price: 10,
                            stock: 100
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/productos/agregar").send(producto)];
                    case 1:
                        response = _a.sent();
                        (0, chai_1.expect)(response.status).to.eql(201);
                        (0, chai_1.expect)(response.body).to.eql({ server: 'Producto creado' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PUT", function () {
        it("deberia retornar un true una vez que se modifica el producto recientemente agregado", function () { return __awaiter(void 0, void 0, void 0, function () {
            var productoModifcado, productos, id, lastProduct, updatedProducto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productoModifcado = {
                            title: 'Mocha Chai y Supertest modificado',
                            description: 'Mocha Chai y Supertest re locos modificado',
                            code: 'mochasup',
                            thumbnail: 'https://www.paradigmadigital.com/wp-content/uploads/2017/02/1.png',
                            price: 10,
                            stock: 100
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/productos/listar")];
                    case 1:
                        productos = _a.sent();
                        id = '';
                        if (!(productos.status === 200)) return [3 /*break*/, 3];
                        lastProduct = productos.body[productos.body.length - 1];
                        id = lastProduct._id;
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/productos/actualizar/" + id).send(productoModifcado)];
                    case 2:
                        updatedProducto = _a.sent();
                        (0, chai_1.expect)(updatedProducto.status).to.eql(200);
                        (0, chai_1.expect)(updatedProducto.body).to.eql(true);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DELETE", function () {
        it("deberia borrar el producto recien agregado, devolver un status 200 y un response.body { server: 'Producto borrado' }", function () { return __awaiter(void 0, void 0, void 0, function () {
            var productos, id, lastProduct, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/productos/listar")];
                    case 1:
                        productos = _a.sent();
                        id = '';
                        if (!(productos.status === 200)) return [3 /*break*/, 3];
                        lastProduct = productos.body[productos.body.length - 1];
                        id = lastProduct._id;
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.app).delete("/productos/borrar/" + id)];
                    case 2:
                        response = _a.sent();
                        (0, chai_1.expect)(response.status).to.eql(200);
                        (0, chai_1.expect)(response.body).to.eql({ server: 'Producto borrado' });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
