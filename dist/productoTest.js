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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = void 0;
var faker = __importStar(require("faker"));
var IProducto_1 = require("./interfaces/IProducto");
var generateData = function (cantidadAGenerar) {
    var productoTest = [];
    for (var i = 0; i < cantidadAGenerar; i++) {
        var newProducto = new IProducto_1.Producto(faker.commerce.productName(), faker.commerce.productDescription(), faker.commerce.productAdjective(), faker.image.image(), Number(faker.commerce.price()), Number(faker.commerce.price()));
        productoTest.push(newProducto);
    }
    return productoTest;
};
exports.generateData = generateData;
