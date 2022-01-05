import express from "express";
import compression from 'compression';
import handlebars from 'express-handlebars';
import { IDao } from "./interfaces/IDao";
import { DaoFactory } from "./daoFactory";
import { loggerInfo } from "./loggers";
import { Session } from "./interfaces/ISession";
import * as SocketIO from "socket.io";
import { sockets } from "./sockets";
import { graphqlHTTP } from "express-graphql";

const port: any = process.env.PORT || +process.argv[2] || 8080;

// para que funcione nodemailer
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export const app = express();

// module.exports = {
//     app,
// };

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.argv[3])

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

export const server = app.listen(port, () => {
    loggerInfo.info(`Servidor listo en el puerto ${port}`)
});


///////////////////////////////////////////////////////////////////////////////////////////////////
// MEMORY = 0;
// FILESYSTEM = 1;
// MYSQL = 2;
// SQLITE = 3;
// MONGO = 4;
// MONGOAAS = 5;
// FIREBASE = 6;
///////////////////////////////////////////////////////////////////////////////////////////////////
const OPCION =+process.argv[3] || 5;;
////////////////////////////////////////////////////////////////////////////////////////////////////

const daoInstance = DaoFactory.getInstance();
export const dao: IDao = daoInstance.getDao(OPCION);


export const newSession = new Session();
export const io = new SocketIO.Server(server);

const rutasLogin = require('./rutas/rutasLogin');
const rutasProductos = require('./rutas/rutasProductos');
const rutasCarrito = require('./rutas/rutasCarrito');
const rutasProcess = require('./rutas/rutasProcess');
sockets();

const graphql = require('./utils/graphql');
app.use("/graphql", graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
}));
app.use('/', rutasLogin);
app.use('/productos', rutasProductos);
app.use('/carrito', rutasCarrito);
app.use('/process', rutasProcess);

process.on(
    'exit',
    (code) => loggerInfo.info(`exit ${code}`)
        ,
);







