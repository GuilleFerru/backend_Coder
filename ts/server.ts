import express, { Request, Response } from "express";
import * as SocketIO from "socket.io";
// import { productsFS } from "./productosFS";
// import { ProductLogic } from "./Product";
import { CartLogic } from "./Cart";
import { productApi } from "./productAPI"
import { cartApi } from "./cartAPI";
import { sockets } from "./sockets";

/* SERVER *//////////////////////////////////////////////////////////////////////////////
export const app = express();
const port: number = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error: string) => {
  console.error(error);
});



export const isAdmin: boolean = true;
export const io = new SocketIO.Server(server);
// export const productLogic = new ProductLogic();
export const cartLogic = new CartLogic();

/* Mongoose  */ //////////////////////////////////////////////////////////////////////
// productsFS;

/* cliente */ /////////////////////////////////////////////////////////////////////////////////

app.use(express.static("./public"));
app.get("/", (_: Request, res: Response) => {
  return res.sendFile("index.html", { root: __dirname });
});

/* API y socket */ /////////////////////////////////////////////////////////////////////////////////
sockets();
productApi();
cartApi();



