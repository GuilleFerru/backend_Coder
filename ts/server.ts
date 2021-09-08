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
  public title: string;
  public price: number;
  public thumbnail: string;
  

  constructor(title: string, price: number, thumbnail: string) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

class ProductLogic {
  private products: Array<Product>;
  private count: number;

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
    this.products.push({ ...product, id: this.count + 1 });
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

const productLogic = new ProductLogic();

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

const routerAPI = express.Router();
app.use("/api", routerAPI);

routerAPI.get("/productos/listar", (_: Request, res: Response) => {
  const products = productLogic.getProducts();
  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ error: "no hay productos cargados" });
  }
});

routerAPI.get("/productos/listar/:id", (req: Request, res: Response) => {
  const id:number = parseInt(req.params.id, 10)
  const productById = productLogic.getProductsById(id);
  if (productById) {
    res.status(200).json(productById);
  } else {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

routerAPI.post("/productos/guardar", (req: Request, res: Response) => {
  const newProduct: Product = new Product(req.body.title, req.body.price, req.body.thumbnail);
  productLogic.addProducts(newProduct);
  io.sockets.emit("loadProducts", productLogic.getProducts());
  res.redirect(302, "/");
});

routerAPI.put("/productos/actualizar/:id", (req: Request, res: Response) => {
  const id:number = parseInt(req.params.id, 10)
  const newProduct: Product = new Product(req.body.title, req.body.price, req.body.thumbnail);
  if (newProduct) {
    res.status(200).json(productLogic.updateProduct(newProduct, id));
    io.sockets.emit("loadProducts", productLogic.getProducts());
  } else {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

routerAPI.delete("/productos/borrar/:id", (req: Request, res: Response) => {
  const id:number = parseInt(req.params.id, 10);
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
