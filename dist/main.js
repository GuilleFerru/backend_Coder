"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dao = void 0;
var server_1 = require("./server");
var productoAPI_1 = require("./productoAPI");
var carritoAPI_1 = require("./carritoAPI");
var sockets_1 = require("./sockets");
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
///////////////////////////////////////////////////////////////////////////////////////////////////
server_1.server;
///////////////////////////////////////////////////////////////////////////////////////////////////
exports.dao = new MongoDbaaSDao_1.MongoDbaaSDao();
/* API y socket */ /////////////////////////////////////////////////////////////////////////////////
(0, sockets_1.sockets)();
(0, productoAPI_1.productoAPI)();
(0, carritoAPI_1.carritoAPI)();
