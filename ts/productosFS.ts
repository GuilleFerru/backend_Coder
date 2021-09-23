import * as fs from "fs";
import { productLogic } from "./server";
import { Product } from "./Product";

export const productsFS = (() => {
  fs.readFile("./productos.txt", "utf8", (error, content: string) => {
    if (error) {
      console.error("Hubo un error con fs.readFile de producto!");
    } else {
      const products: Array<Product> = [];
      const savedProducts = JSON.parse(content);
      savedProducts.forEach((product: Product) => {
        products.push(product);
      });
      productLogic.loadProducts(products);
    }
  });
})();
