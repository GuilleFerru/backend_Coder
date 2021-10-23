import express, { Request, Response } from "express";
import * as SocketIO from "socket.io";
import { app, server } from "./server";
import { IDao } from "./interfaces/IDao";
import { productoAPI } from "./productoAPI"
import { carritoAPI } from "./carritoAPI";
import { sockets } from "./sockets";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import { loginAPI } from "./loginUserAPI";
///////////////////////////////////////////////////////////////////////////////////////////////////
server;
///////////////////////////////////////////////////////////////////////////////////////////////////



/* cliente */ /////////////////////////////////////////////////////////////////////////////////
app.use(express.static("./public"));
// app.get("/login", (_: Request, res: Response) => {
//     return res.sendFile("index.html", { root: __dirname });
// });

export const dao: IDao = new MongoDbaaSDao();
export const isAdmin: boolean = true;
export const io = new SocketIO.Server(server);

// console.log( loginOk());
loginAPI();




