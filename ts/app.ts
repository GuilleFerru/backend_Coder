import express from "express";
import compression from 'compression';
import handlebars from 'express-handlebars';
import {Singleton} from './utils/dbConnection';
import { loggerInfo } from "./loggers";
import { Session } from "./interfaces/ISession";
import cluster from 'cluster';
import * as os from 'os';
import http from 'http'
import * as SocketIO from "socket.io";
import { sockets } from "./sockets";



// const modoCluster = process.argv[2] == 'CLUSTER';

// if (modoCluster && cluster.isMaster) {

//     loggerInfo.info(`PID MASTER ${process.pid}`)
//     const numCPUs = os.cpus().length;
//     loggerInfo.info(`Número de procesadores: ${numCPUs}`)

//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         loggerInfo.info(`worker ${worker.process.pid} died`);
//     })

// } else {

const port: any = process.env.PORT || +process.argv[2] || 8080;

// para que funcione nodemailer
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser())
// app.use(session({
//     store: MongoStore.create({
//         //En Atlas connect App: Make sure to change the node version to 2.2.12:
//         mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
//         //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//         ttl: 3600
//     }),
//     secret: 'secretin',
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//         maxAge: 1_000 * 3600
//     }
// }));

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
Singleton.getInstance();
// const db = require('./utils/dbConnection');
// dbInstance.connectToMongo();

export const newSession = new Session();
export const io = new SocketIO.Server(server);

const rutasLogin = require('./rutas/rutasLogin');
const rutasProductos = require('./rutas/rutasProductos');
const rutasCarrito = require('./rutas/rutasCarrito');
const rutasProcess = require('./rutas/rutasProcess');
sockets();

app.use('/', rutasLogin);
app.use('/productos', rutasProductos);
app.use('/carrito', rutasCarrito);
app.use('/process', rutasProcess);


process.on(
    'exit',
    (code) => loggerInfo.info(`exit ${code}`)
        ,
);







// sockets();





// }