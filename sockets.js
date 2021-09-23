"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = void 0;
var server_1 = require("./server");
var mensajesFS_1 = require("./mensajesFS");
var carritoFS_1 = require("./carritoFS");
var sockets = function () {
    server_1.io.on("connection", function (socket) {
        // socket.emit("loadProducts", productLogic.getProducts());
        socket.emit("messages", server_1.messages);
        socket.emit("products", server_1.productLogic.getProducts(), server_1.isAdmin);
        socket.on("newMessage", function (message) {
            server_1.messages.push(message);
            server_1.io.sockets.emit("messages", server_1.messages);
            (0, mensajesFS_1.saveMessages)(server_1.messages);
        });
        socket.on("saveCart", function (cart) {
            console.log(cart);
            (0, carritoFS_1.saveCarrito)(cart);
        });
    });
};
exports.sockets = sockets;
