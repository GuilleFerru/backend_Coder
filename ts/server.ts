import express from "express";
import compression from 'compression';
import handlebars from 'express-handlebars';
import { IDao } from "./model/DAOs/interfaces/IDao";
import { DaoFactory } from "./model/DAOs/daoFactory";
import { loggerInfo } from "./utils/loggers";
import { Session } from "./model/DAOs/interfaces/ISession";
import * as SocketIO from "socket.io";
// import { sockets } from "./sockets";
import { graphqlHTTP } from "express-graphql";
// import minimist from 'minimist';
// import cors from 'cors';

// const minimistArgs = minimist(process.argv.slice(2), {
//     default: {
//         port: 8080,
//     }
// });

// const port = minimistArgs.port;
const port = process.env.PORT || 8080;
// const config = require('../config.js');
export const app = express();

// #region Middlewares

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'));


// if(config.NODE_ENV === 'development'){
//     app.use(cors());
// }

// //#endregion

export const server = app.listen(port, () => {
    loggerInfo.info(`Servidor listo en el puerto ${port}`)
});


// #region Persistent

// MEMORY = 1;
// FILESYSTEM = 2;
// MYSQL = 3;
// SQLITE = 4;
// MONGO = 5
// MONGOAAS = 6;
// FIREBASE = 7;

// const OPCION = + config.PERSISTENCIA;
export let OPCION = 6;
const daoInstance = DaoFactory.getInstance();
export const dao: IDao = daoInstance.getDao(OPCION);

// #endregion


export const newSession = new Session();
export const io = new SocketIO.Server(server);



const RouterLogin = require('./router/login');
const routerLogin = new RouterLogin();

const RouterProductos = require('./router/productos');
const routerProductos = new RouterProductos();

const RouterCarrito = require('./router/carrito');
const routerCarrito = new RouterCarrito();

const RouterProcess = require('./router/process');
const routerProcess = new RouterProcess();

// sockets();

const graphql = require('./utils/graphql');
app.use("/graphql", graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
}));

app.use('/', routerLogin.start());
app.use('/productos', routerProductos.start());
app.use('/carrito', routerCarrito.start());
app.use('/process', routerProcess.start());

process.on(
    'exit',
    (code) => loggerInfo.info(`exit ${code}`)
        ,
);







