import * as fs from "fs";

export class Product {
  // public id: number = 0;
  // public timestamp: number = 0;
  public title: string;
  public description: string;
  public code: string;
  public thumbnail: string;
  public price: number;
  public stock: number;

  constructor(
    title: string,
    description: string,
    code: string,
    thumbnail: string,
    price: number,
    stock: number
  ) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.price = price;
    this.stock = stock;
  }
}

export class ProductLogic {
  private products: Array<Product>;

  constructor() {
    this.products = new Array<Product>();
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id: number) {
    // return this.products.find((element) => element.id === id);
    return ''
  }

  addProducts(product: Product) {
    // const lastProductId = this.products[this.products.length - 1].id;
    // this.products.push({
    //   ...product,
    //   // id: lastProductId + 1,
    //   // timestamp: Date.now(),
    // });
    // this.saveProducts(this.products);
    return 'product';
  }

  updateProduct(newProduct: Product, id: number) {
    // return (this.products[id - 1] = { ...newProduct, id: id });
    return ''
  }

  deleteProduct(productToBeDelete: Product) {
    // const index = this.products.indexOf(productToBeDelete);
    // this.products.splice(index, 1);
    // this.saveProducts(this.products);
    return productToBeDelete;
  }

  loadProducts = (products: Array<Product>) => {
    this.products = products;
  };

  saveProducts = (products: Array<Product>) => {
    try {
      fs.writeFileSync("./productos.txt", JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log("Hubo un error");
    }
  };
}
