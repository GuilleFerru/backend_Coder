"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var loggers_1 = require("./loggers");
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
var port = process.env.PORT || +process.argv[2] || 8080;
// para que funcione nodemailer
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
exports.app = (0, express_1.default)();
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
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
exports.app.engine("hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
}));
exports.app.set("view engine", "hbs");
exports.app.set("views", "./views");
exports.app.use(express_1.default.static('public'));
var rutasLogin = require('./rutas/rutasLogin');
var rutasProductos = require('./rutas/rutasProductos');
exports.app.use('/', rutasLogin);
exports.app.use('/productos', rutasProductos);
exports.app.listen(port, function () {
    loggers_1.loggerInfo.info("Servidor listo en el puerto " + port);
});
process.on('exit', function (code) { return loggers_1.loggerInfo.info("exit " + code); });
// sockets();
// }
