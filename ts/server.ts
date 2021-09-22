import express, { Request, Response } from "express";
import * as SocketIO from "socket.io";
import * as fs from "fs";
import { optionsSQLite } from "./SQLite3";
import { optionsMariaDB } from "./mariaDB";

const app = express();
const port: number = 8080;

const messages: Array<Mensaje> = [];
const isAdmin: boolean = true;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error: string) => {
  console.error(error);
});

const io = new SocketIO.Server(server);

////////////////////////////////////////////////////////////////////

class Product {
  public id: number = 0;
  public timestamp: number = 0;
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

class ProductLogic {
  private products: Array<Product>;

  constructor() {
    this.products = new Array<Product>();
  }

  async getProducts() {
    const knex = require("knex")(optionsMariaDB);
    try {
      const productosFromDB = await knex.from("productos").select("*");
      this.products = [];
      for (const producto of productosFromDB) {
        this.products.push(producto);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      knex.destroy();
      return this.products;
    }
  }

  getProductsById(id: number) {
    return this.products.find((element) => element.id === id);
  }

  async addProducts(product: Product) {
    const knex = require("knex")(optionsMariaDB);
    try {
      await knex("productos").insert([
        {
          timestamp: Date.now(),
          title: product.title,
          description: product.description,
          code: product.code,
          thumbnail: product.thumbnail,
          price: product.price,
          stock: product.stock,
        },
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      knex.destroy();
      return this.products;
    }
  }

  async updateProduct(newProduct: Product, id: number) {
    const knex = require("knex")(optionsMariaDB);
    try {
      await knex.from("productos").where("id", id).update({
        title: newProduct.title,
        description: newProduct.description,
        code: newProduct.code,
        thumbnail: newProduct.thumbnail,
        price: newProduct.price,
        stock: newProduct.stock
      })    
    }catch(error){
      console.log(error);
      throw error;
    }finally{
      knex.destroy();
      return (this.products[id - 1] = { ...newProduct, id: id });     
    }
  }

  async deleteProduct(productToBeDelete: Product) {
    const knex = require("knex")(optionsMariaDB);
    try {
      const index = this.products.indexOf(productToBeDelete);
      const id = productToBeDelete.id;
      await knex.from("productos").where("id", id).del();
      this.products.splice(index, 1);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      knex.destroy();
      return productToBeDelete;
    }
  }

  loadProducts = (products: Array<Product>) => {
    this.products = products;
  };
}

interface Cart {
  id: number;
  timestamp: number;
  quantity: number;
  product?: Product;
}

class CartLogic {
  private cart: Array<Cart>;
  private count: number;
  private timestamp: number;

  constructor() {
    this.count = 0;
    this.timestamp = 0;
    this.cart = new Array<Cart>();
  }

  getCart() {
    return this.cart;
  }

  getProductsInCart() {
    return this.cart;
  }

  getCartById(id: number) {
    return this.cart.find((element) => element.id === id);
  }

  addProductToCart(product: Product) {
    this.cart.push({
      id: this.count + 1,
      timestamp: Date.now(),
      quantity: 1,
      product,
    });
    this.count++;
    return this.cart;
  }

  updateQtyInCart(cart: Cart) {
    const newCart: Cart = {
      ...cart,
      quantity: cart.quantity + 1,
    };
    const index = this.cart.indexOf(cart);
    this.cart[index] = newCart;
  }

  deleteCart(cartToBeDelete: Cart) {
    const index = this.cart.indexOf(cartToBeDelete);
    this.cart.splice(index, 1);
    return cartToBeDelete;
  }
}

interface Mensaje {
  author: string;
  date: string;
  text: string;
}

const productLogic = new ProductLogic();
const cartLogic = new CartLogic();

/* FS  */ //////////////////////////////////////////////////////////////////////

/*  read file de chat */

(async () => {
  const knex = require("knex")(optionsSQLite);
  try {
    let mensajes = await knex.from("mensajes").select("*");
    const savedMessages = mensajes;
    savedMessages.forEach((message: Mensaje) => {
      messages.push(message);
    });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    knex.destroy();
  }
})();

const saveMessages = async (message: Mensaje) => {
  const knex = require("knex")(optionsSQLite);
  try {
    await knex("mensajes").insert([
      {
        author: message.author,
        date: message.date,
        text: message.text,
      },
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    knex.destroy();
  }
};

/* sockets */ /////////////////////////////////////////////////////////////////////////////////

app.use(express.static("./public"));

app.get("/", (_: Request, res: Response) => {
  return res.sendFile("index.html", { root: __dirname });
});

io.on("connection", async (socket) => {
  // socket.emit("loadProducts", productLogic.getProducts());
  socket.emit("messages", messages);
  socket.emit("products", await productLogic.getProducts(), isAdmin);
  socket.on("newMessage", (message) => {
    messages.push(message);
    io.sockets.emit("messages", messages);
    saveMessages(message);
  });
});

/* PRODUCTOS API */ /////////////////////////////////////////////////////////////////////////

const routerProducts = express.Router();
app.use("/productos", routerProducts);
const carritoProducts = express.Router();
app.use("/carrito", carritoProducts);

const checkIdProduct = (req: Request, res: Response, next: () => void) => {
  const id: number = parseInt(req.params.id, 10);
  const productById = productLogic.getProductsById(id);
  if (id) {
    if (productById?.id === id) {
      res.status(200).json(productById);
    } else {
      res.status(404).json({ error: "este producto no esta cargado" });
    }
  } else {
    next();
  }
};

routerProducts.get(
  "/listar/:id?",
  checkIdProduct,
  async (_: Request, res: Response) => {
    const products = await productLogic.getProducts();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "no hay productos cargados" });
    }
  }
);

routerProducts.post("/agregar", async (req: Request, res: Response) => {
  if (isAdmin) {
    const newProduct: Product = new Product(
      req.body.title,
      req.body.description,
      req.body.code,
      req.body.thumbnail,
      req.body.price,
      req.body.stock
    );
    await productLogic.addProducts(newProduct);
    io.sockets.emit("products", await productLogic.getProducts());
    res.status(200).json({ server: "Producto creado" });
  } else {
    res.status(403).json({
      error: -1,
      descripcion: "ruta /productos/agregar metodo POST no autorizado",
    });
  }
});

routerProducts.put("/actualizar/:id", async (req: Request, res: Response) => {
  if (isAdmin) {
    const id: number = parseInt(req.params.id, 10);
    const newProduct: Product = new Product(
      req.body.title,
      req.body.description,
      req.body.code,
      req.body.thumbnail,
      req.body.price,
      req.body.stock
    );
    if (newProduct) {
      res.status(200).json(await productLogic.updateProduct(newProduct, id));
      io.sockets.emit("products",await productLogic.getProducts());
    } else {
      res.status(404).json({ error: "producto no encontrado" });
    }
  } else {
    res.status(403).json({
      error: -1,
      descripcion: `ruta /productos/actualizar/${req.params.id} metodo PUT no autorizado`,
    });
  }
});

routerProducts.delete("/borrar/:id", async (req: Request, res: Response) => {
  if (isAdmin) {
    const id: number = parseInt(req.params.id, 10);
    const productToBeDelete = productLogic.getProductsById(id);
    if (productToBeDelete) {
      res.status(200).json(await productLogic.deleteProduct(productToBeDelete));
      io.sockets.emit("products", await productLogic.getProducts());
    } else {
      res
        .status(404)
        .json({ error: "producto no existente, no se puede borrar" });
    }
  } else {
    res.status(403).json({
      error: -1,
      descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
    });
  }
});

/* CARRITO API */ ///////////////////////////////////////////////////////////////////////////////////////

carritoProducts.post("/agregar/:id_producto", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id_producto, 10);
  const productById = productLogic.getProductsById(id);
  if (productById) {
    const carts = cartLogic.getCart();
    if (carts.length > 0) {
      const cartToBeUpdate = carts.find((cart) => cart.product?.id === id);
      if (cartToBeUpdate) {
        cartLogic.updateQtyInCart(cartToBeUpdate);
      } else {
        cartLogic.addProductToCart(productById);
      }
    } else {
      cartLogic.addProductToCart(productById);
    }
    res.status(200).json({ server: "Producto agregado al carrito" });
  } else {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

const checkIdProductInCarrito = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const id: number = parseInt(req.params.id, 10);
  const cart = cartLogic.getCartById(id);
  if (id) {
    if (cart?.id === id) {
      res.status(200).json(cart.product);
    } else {
      res
        .status(404)
        .json({ error: "este producto no esta cargado en el carrito" });
    }
  } else {
    next();
  }
};

carritoProducts.get(
  "/listar/:id?",
  checkIdProductInCarrito,
  (_: Request, res: Response) => {
    const carritos = cartLogic.getCart();
    res.status(200).json(carritos);
  }
);

carritoProducts.delete("/borrar/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const cartToBeDelete = cartLogic.getCartById(id);
  if (cartToBeDelete) {
    res.status(200).json(cartLogic.deleteCart(cartToBeDelete));
    io.sockets.emit("carts", cartLogic.getCart());
  } else {
    res.status(404).json({ error: "carrito no existente, no se puede borrar" });
  }
});
