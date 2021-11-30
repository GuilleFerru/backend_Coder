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
var server_1 = require("./server");
var productoAPI_1 = require("./productoAPI");
var carritoAPI_1 = require("./carritoAPI");
var sockets_1 = require("./sockets");
var loginUserAPI_1 = require("./loginUserAPI");
var processAPI_1 = require("./processAPI");
var loggers_1 = require("./loggers");
var cluster_1 = __importDefault(require("cluster"));
var os = __importStar(require("os"));
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var modoCluster = process.argv[2] == 'CLUSTER';
if (modoCluster && cluster_1.default.isMaster) {
    loggers_1.loggerInfo.info("PID MASTER " + process.pid);
    var numCPUs = os.cpus().length;
    loggers_1.loggerInfo.info("N\u00FAmero de procesadores: " + numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code, signal) {
        loggers_1.loggerInfo.info("worker " + worker.process.pid + " died");
    });
}
else {
    server_1.server;
    (0, loginUserAPI_1.loginAPI)();
    (0, sockets_1.sockets)();
    (0, productoAPI_1.productoAPI)();
    (0, carritoAPI_1.carritoAPI)();
    (0, processAPI_1.processAPI)();
    process.on('exit', function (code) { return loggers_1.loggerInfo.info("exit " + code); });
}
//Configuración de handlebars
// app.engine(
//     "hbs",
//     handlebars({
//         extname: ".hbs",
//         defaultLayout: 'index.hbs',
//     })
// );
// app.set("view engine", "hbs");
// app.set("views", "./views");
// app.use(express.static('public'))
// loginAPI();
// sockets();
// productoAPI();
// carritoAPI();
// processAPI();
// process.on(
//     'exit',
//     (code) => loggerInfo.info(`exit ${code}`)
//     ,
// );
