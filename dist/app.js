"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.newSession = exports.dao = exports.server = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var daoFactory_1 = require("./model/DAOs/daoFactory");
var loggers_1 = require("./utils/loggers");
var ISession_1 = require("./model/DAOs/interfaces/ISession");
var SocketIO = __importStar(require("socket.io"));
var sockets_1 = require("./sockets");
var express_graphql_1 = require("express-graphql");
var minimist_1 = __importDefault(require("minimist"));
var cors_1 = __importDefault(require("cors"));
var minimistArgs = (0, minimist_1.default)(process.argv.slice(2), {
    default: {
        port: 8080,
    }
});
var port = minimistArgs.port;
var config = require('../config.js');
exports.app = (0, express_1.default)();
// #region Middlewares
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.engine("hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
}));
exports.app.set("view engine", "hbs");
exports.app.set("views", "./views");
exports.app.use(express_1.default.static('public'));
if (config.NODE_ENV === 'development') {
    exports.app.use((0, cors_1.default)());
}
// //#endregion
exports.server = exports.app.listen(port, function () {
    loggers_1.loggerInfo.info("Servidor listo en el puerto " + port);
});
// #region Persistent
// MEMORY = 1;
// FILESYSTEM = 2;
// MYSQL = 3;
// SQLITE = 4;
// MONGO = 5
// MONGOAAS = 6;
// FIREBASE = 7;
var OPCION = +config.PERSISTENCIA;
var daoInstance = daoFactory_1.DaoFactory.getInstance();
exports.dao = daoInstance.getDao(OPCION);
// #endregion
exports.newSession = new ISession_1.Session();
exports.io = new SocketIO.Server(exports.server);
var RouterLogin = require('./router/login');
var routerLogin = new RouterLogin();
var RouterProductos = require('./router/productos');
var routerProductos = new RouterProductos();
var RouterCarrito = require('./router/carrito');
var routerCarrito = new RouterCarrito();
var RouterProcess = require('./router/process');
var routerProcess = new RouterProcess();
(0, sockets_1.sockets)();
var graphql = require('./utils/graphql');
exports.app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
}));
exports.app.use('/', routerLogin.start());
exports.app.use('/productos', routerProductos.start());
exports.app.use('/carrito', routerCarrito.start());
exports.app.use('/process', routerProcess.start());
process.on('exit', function (code) { return loggers_1.loggerInfo.info("exit " + code); });
