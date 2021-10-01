import { isAdmin, io } from "./server"
import { saveCarrito } from './carritoFS'
import { loadMessagesFromDB, saveMessageToDB } from "./mensajesDB";
import { loadProductsFromDB } from "./productosDB";

export const sockets = () => {
    io.on("connection", async (socket) => {
        socket.emit("messages", await loadMessagesFromDB());
        socket.emit("products", await loadProductsFromDB(), isAdmin);
        socket.on("newMessage", async (message) => {
            await saveMessageToDB(message)
            io.sockets.emit("messages", await loadMessagesFromDB());
        });
        socket.on("saveCart", (cart) => {
            console.log(cart);
            saveCarrito(cart);
        })
    });
}