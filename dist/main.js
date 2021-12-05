"use strict";
// import express from "express";
// import { server } from "./server";
// import { productoAPI } from "./productoAPI"
// import { carritoAPI } from "./carritoAPI";
// import { sockets } from "./sockets";
// import { loginAPI } from "./loginUserAPI";
// import { processAPI } from "./processAPI";
// import { loggerInfo } from "./loggers";
// import cluster from 'cluster';
// import * as os from 'os';
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////
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
//     server;
//     loginAPI();
//     sockets();
//     productoAPI();
//     carritoAPI();
//     processAPI();
//     process.on(
//         'exit',
//         (code) => loggerInfo.info(`exit ${code}`)
//     ,
//     );
// }
// //Configuración de handlebars
// // app.engine(
// //     "hbs",
// //     handlebars({
// //         extname: ".hbs",
// //         defaultLayout: 'index.hbs',
// //     })
// // );
// // app.set("view engine", "hbs");
// // app.set("views", "./views");
// // app.use(express.static('public'))
// // loginAPI();
// // sockets();
// // productoAPI();
// // carritoAPI();
// // processAPI();
// // process.on(
// //     'exit',
// //     (code) => loggerInfo.info(`exit ${code}`)
// //     ,
// // );
