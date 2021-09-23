import { isAdmin, messages, io, productLogic } from "./server"
import { saveMessages } from "./mensajesFS";
import { saveCarrito } from './carritoFS'

export const sockets = () => {
    io.on("connection", (socket) => {
        // socket.emit("loadProducts", productLogic.getProducts());
        socket.emit("messages", messages);
        socket.emit("products", productLogic.getProducts(), isAdmin);
        socket.on("newMessage", (message) => {
            messages.push(message);
            io.sockets.emit("messages", messages);
            saveMessages(messages);
        });
        socket.on("saveCart", (cart) => {
            console.log(cart);
            
            saveCarrito(cart);
        })
    });

}