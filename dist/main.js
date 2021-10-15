"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dao = void 0;
var server_1 = require("./server");
var daoFactory_1 = require("./daoFactory");
var productoAPI_1 = require("./productoAPI");
var carritoAPI_1 = require("./carritoAPI");
var sockets_1 = require("./sockets");
///////////////////////////////////////////////////////////////////////////////////////////////////
server_1.server;
///////////////////////////////////////////////////////////////////////////////////////////////////
var MEMORY = 0;
var FILESYSTEM = 1;
var MYSQL = 2;
var SQLITE = 3;
var MONGO = 4;
var MONGOAAS = 5;
var FIREBASE = 6;
///////////////////////////////////////////////////////////////////////////////////////////////////
var OPCION = MONGOAAS;
////////////////////////////////////////////////////////////////////////////////////////////////////
var daoFactory = new daoFactory_1.DaoFactory();
exports.dao = daoFactory.getDao(OPCION);
/* API y socket */ /////////////////////////////////////////////////////////////////////////////////
(0, sockets_1.sockets)();
(0, productoAPI_1.productoAPI)();
(0, carritoAPI_1.carritoAPI)();
