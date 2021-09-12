import express, { Request, Response } from "express";
import * as SocketIO from "socket.io";
import * as fs from "fs";

const app = express();
const port: number = 8080;
const fileName: string = "./messages.txt";
const messages: Array<string> = [];

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
  private count: number;
  // private timestamp: number;

  constructor() {
    this.products = new Array<Product>();
    this.count = 0;
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id: number) {
    return this.products.find((element) => element.id === id);
  }

  addProducts(product: Product) {
    this.products.push({
      ...product,
      id: this.count + 1,
      timestamp: Date.now(),
    });
    this.count++;
    return product;
  }

  updateProduct(newProduct: Product, id: number) {
    return (this.products[id - 1] = { ...newProduct, id: id });
  }

  deleteProduct(productToBeDelete: Product) {
    const index = this.products.indexOf(productToBeDelete);
    this.products.splice(index, 1);
    return productToBeDelete;
  }
}

//////////////////////////////////////////////////////////////////////////////

class Cart {
  public id: number = 0;
  public product: Array<Product>;
  public timestamp: number = 0;

  constructor(id: number, timestamp: number, product: Array<Product>) {
    this.id = id;
    this.timestamp = timestamp;
    this.product = product;
  }
}

class CartLogic {
  private cart: Array<Cart>;


  constructor() {
    this.cart = new Array<Cart>();

  }

  getCart() {
    return this.cart;
  }

  getProductInCartById(id: number) {
    

    this.cart[0].product.map((product)=>{
      
      
    })


    return this.cart.find((element) =>{
      
      
      element.id === id
    } );
  }

  addProductToCart(cart: Cart) {
    this.cart = [];
    this.cart.push(cart);
    return this.cart;
  }

  deleteCart(cartToBeDelete: Cart) {
    const index = this.cart.indexOf(cartToBeDelete);
    this.cart.splice(index, 1);
    return cartToBeDelete;
  }
}

/* socket chat */ /////////////////////////////////////////////////////////////////////////////////
const productLogic = new ProductLogic();
const cartLogic = new CartLogic();

app.use(express.static("./public"));

app.get("/", (_: Request, res: Response) => {
  return res.sendFile("index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  socket.emit("loadProducts", productLogic.getProducts());
  socket.emit("messages", messages);
  socket.on("newMessage", (message) => {
    messages.push(message);
    io.sockets.emit("messages", messages);
    saveMessages(messages);
  });
});

(() => {
  fs.readFile(fileName, "utf8", (error, content: string) => {
    if (error) {
      console.error("Hubo un error con fs.readFile!");
    } else {
      const savedMessages = JSON.parse(content);
      savedMessages.forEach((message: string) => {
        messages.push(message);
      });
    }
  });
})();

const saveMessages = (messages: Array<string>) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(messages, null, "\t"));
  } catch (error) {
    console.log("Hubo un error");
  }
};

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
  (_: Request, res: Response) => {
    const products = productLogic.getProducts();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "no hay productos cargados" });
    }
  }
);

routerProducts.post("/agregar", (req: Request, res: Response) => {
  const newProduct: Product = new Product(
    req.body.title,
    req.body.description,
    req.body.code,
    req.body.thumbnail,
    req.body.price,
    req.body.stock
  );
  productLogic.addProducts(newProduct);
  io.sockets.emit("loadProducts", productLogic.getProducts());
  res.status(200).json({ server: "Producto creado" });
});

routerProducts.put("/actualizar/:id", (req: Request, res: Response) => {
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
    res.status(200).json(productLogic.updateProduct(newProduct, id));
    io.sockets.emit("loadProducts", productLogic.getProducts());
  } else {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

routerProducts.delete("/borrar/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const productToBeDelete = productLogic.getProductsById(id);
  if (productToBeDelete) {
    res.status(200).json(productLogic.deleteProduct(productToBeDelete));
    io.sockets.emit("loadProducts", productLogic.getProducts());
  } else {
    res
      .status(404)
      .json({ error: "producto no existente, no se puede borrar" });
  }
});

/* CARRITO API */ ////////////////////////////////////////////////////////////////////////////////////////

const productsInCart = Array<Product>();
carritoProducts.post("/agregar/:id_producto", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id_producto, 10);
  const productById = productLogic.getProductsById(id);
  if (productById) {
    productsInCart.push(productById);
    const id = Math.floor(Math.random() * Math.pow(10,15));
    const newCarrito: Cart = new Cart(id, Date.now(),productsInCart);
    cartLogic.addProductToCart(newCarrito);
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
  const cartProduct = cartLogic.getProductInCartById(id);
  if (id) {
    if (cartProduct?.id === id) {
      res.status(200).json(cartProduct);
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
  const cartToBeDelete = cartLogic.getProductInCartById(id);

  
  if (cartToBeDelete) {
    res.status(200).json(cartLogic.deleteCart(cartToBeDelete));
  } else {
    res.status(404).json({ error: "carrito no existente, no se puede borrar" });
  }
});
