import { isAdmin, io } from "./server"
import { saveCarrito } from './carritoFS'
import { loadMessagesFromDB, saveMessageToDB } from "./mensajesDB";
import { loadProductsFromDB } from "./productosDB";
import { dao } from "./main";
import { Mensaje } from "./interfaces/IMensaje";

export const sockets = () => {
    io.on("connection", async (socket) => {
        socket.emit("messages", await dao.getMensajes());
        // socket.emit("messages", await loadMessagesFromDB());
        socket.emit("products", await dao.getProductos(), isAdmin);

        socket.on("newMessage", async (message: Mensaje) => {
            const date = new Date().toLocaleString('es-AR');
            const newMensaje: Mensaje = new Mensaje(
                message.author,
                date,
                message.text
            )
            await dao.insertMensajes(newMensaje);
            io.sockets.emit("messages", await dao.getMensajes());
            // await saveMessageToDB(message)
            // io.sockets.emit("messages", await loadMessagesFromDB());
        });
        // socket.on("saveCart", (cart) => {
        //     saveCarrito(cart);
        // })
    });
}