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
exports.ProductLogic = exports.Product = void 0;
var fs = __importStar(require("fs"));
var Product = /** @class */ (function () {
    function Product(title, description, code, thumbnail, price, stock) {
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
exports.Product = Product;
var ProductLogic = /** @class */ (function () {
    function ProductLogic() {
        var _this = this;
        this.loadProducts = function (products) {
            _this.products = products;
        };
        this.saveProducts = function (products) {
            try {
                fs.writeFileSync("./productos.txt", JSON.stringify(products, null, "\t"));
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
        // return this.products.find((element) => element.id === id);
        return '';
    };
    ProductLogic.prototype.addProducts = function (product) {
        // const lastProductId = this.products[this.products.length - 1].id;
        // this.products.push({
        //   ...product,
        //   // id: lastProductId + 1,
        //   // timestamp: Date.now(),
        // });
        // this.saveProducts(this.products);
        return 'product';
    };
    ProductLogic.prototype.updateProduct = function (newProduct, id) {
        // return (this.products[id - 1] = { ...newProduct, id: id });
        return '';
    };
    ProductLogic.prototype.deleteProduct = function (productToBeDelete) {
        // const index = this.products.indexOf(productToBeDelete);
        // this.products.splice(index, 1);
        // this.saveProducts(this.products);
        return productToBeDelete;
    };
    return ProductLogic;
}());
exports.ProductLogic = ProductLogic;
