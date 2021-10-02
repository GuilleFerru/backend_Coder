"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(title, description, code, thumbnail, price, stock) {
        this.id = '';
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
// export class ProductLogic {
//   private products: Array<Product>;
//   constructor() {
//     this.products = new Array<Product>();
//   }
//   getProducts() {
//     return this.products;
//   }
//   getProductsById(id: number) {
//     // return this.products.find((element) => element.id === id);
//     return ''
//   }
//   addProducts(product: Product) {
//     // const lastProductId = this.products[this.products.length - 1].id;
//     // this.products.push({
//     //   ...product,
//     //   // id: lastProductId + 1,
//     //   // timestamp: Date.now(),
//     // });
//     // this.saveProducts(this.products);
//     return 'product';
//   }
//   updateProduct(newProduct: Product, id: number) {
//     // return (this.products[id - 1] = { ...newProduct, id: id });
//     return ''
//   }
//   deleteProduct(productToBeDelete: Product) {
//     // const index = this.products.indexOf(productToBeDelete);
//     // this.products.splice(index, 1);
//     // this.saveProducts(this.products);
//     return productToBeDelete;
//   }
//   loadProducts = (products: Array<Product>) => {
//     this.products = products;
//   };
//   saveProducts = (products: Array<Product>) => {
//     try {
//       fs.writeFileSync("./productos.txt", JSON.stringify(products, null, "\t"));
//     } catch (error) {
//       console.log("Hubo un error");
//     }
//   };
// }
