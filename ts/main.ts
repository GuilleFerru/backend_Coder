import express from "express";
import handlebars from 'express-handlebars'
import * as SocketIO from "socket.io";
import { app, server } from "./server";
import { IDao } from "./interfaces/IDao";
import { productoAPI } from "./productoAPI"
import { carritoAPI } from "./carritoAPI";
import { sockets } from "./sockets";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import { loginAPI } from "./loginUserAPI";
import { processAPI } from "./processAPI";
import { loggerInfo } from "./loggers";


///////////////////////////////////////////////////////////////////////////////////////////////////
server;
///////////////////////////////////////////////////////////////////////////////////////////////////



//Configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");


app.use(express.static('public'))



export const dao: IDao = new MongoDbaaSDao();
export const isAdmin: boolean = true;
export const io = new SocketIO.Server(server);


loginAPI();
sockets();
productoAPI();
carritoAPI();
processAPI();


process.on(
    'exit',
    (code) => loggerInfo.info(`exit ${code}`)
    ,
);


