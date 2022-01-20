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
var daoFactory_1 = require("./daoFactory");
var loggers_1 = require("./loggers");
var ISession_1 = require("./interfaces/ISession");
var SocketIO = __importStar(require("socket.io"));
var sockets_1 = require("./sockets");
var express_graphql_1 = require("express-graphql");
var minimist_1 = __importDefault(require("minimist"));
var minimistArgs = (0, minimist_1.default)(process.argv.slice(2), {
    default: {
        port: 8080,
    }
});
var port = minimistArgs.port;
var config = require('../config.js');
exports.app = (0, express_1.default)();
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
exports.server = exports.app.listen(port, function () {
    loggers_1.loggerInfo.info("Servidor listo en el puerto " + port);
});
///////////////////////////////////////////////////////////////////////////////////////////////////
// MEMORY = 1;
// FILESYSTEM = 2;
// MYSQL = 3;
// SQLITE = 4;
// MONGO = 5
// MONGOAAS = 6;
// FIREBASE = 7;
///////////////////////////////////////////////////////////////////////////////////////////////////
var OPCION = +config.PERSISTENCIA;
////////////////////////////////////////////////////////////////////////////////////////////////////
var daoInstance = daoFactory_1.DaoFactory.getInstance();
exports.dao = daoInstance.getDao(OPCION);
exports.newSession = new ISession_1.Session();
exports.io = new SocketIO.Server(exports.server);
var rutasLogin = require('./rutas/rutasLogin');
var rutasProductos = require('./rutas/rutasProductos');
var rutasCarrito = require('./rutas/rutasCarrito');
var rutasProcess = require('./rutas/rutasProcess');
(0, sockets_1.sockets)();
var graphql = require('./utils/graphql');
exports.app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
}));
exports.app.use('/', rutasLogin);
exports.app.use('/productos', rutasProductos);
exports.app.use('/carrito', rutasCarrito);
exports.app.use('/process', rutasProcess);
process.on('exit', function (code) { return loggers_1.loggerInfo.info("exit " + code); });
