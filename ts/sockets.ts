import { isAdmin, io } from "./main"
import { dao } from "./main";
import { Mensaje, Author, MensajeWrap } from "./interfaces/IMensaje";
import { loggerError, loggerInfo } from "./loggers";
import * as normalizr from 'normalizr';
import * as twilio from './sms/twilio.js'





const getNormalizeMsj = async () => {

    const mensajesOriginal: MensajeWrap = await dao.getMensajes();
    const mensajesOriginalToString = JSON.stringify(mensajesOriginal);
    const mensajeParse = JSON.parse(mensajesOriginalToString)

    const author = new normalizr.schema.Entity("author",
        undefined,
        {
            idAttribute: 'email',
        }
    );
    const post = new normalizr.schema.Entity("post", {
        author: author,

    });
    const chat = new normalizr.schema.Entity('chat', {
        authors: [author],
        posts: [post]
    })
    const normalizePost = normalizr.normalize(mensajeParse, chat);
    return normalizePost;
}

const generateMensajeId = () => {
    return Math.floor(Math.random() * 8 + 1) + Math.random().toString().slice(2, 10);
}

export const sockets = async () => {
    const port: any = process.env.PORT || process.argv[2] || 8080;

    io.on("connection", async (socket) => {

        socket.emit("messages", await getNormalizeMsj());

        socket.emit('port', port)

        socket.on("newMessage", async (mensaje: Mensaje) => {

            const date = new Date().toLocaleString('es-AR');
            let id = generateMensajeId();
            const checkId = dao.getMensajeById(id);
            while (checkId) {
                id = generateMensajeId();
            }
            const newAuthor: Author = new Author(
                mensaje.author.email,
                mensaje.author.nombre,
                mensaje.author.apellido,
                mensaje.author.edad,
                mensaje.author.alias,
                mensaje.author.avatar,
            )
            const newMensaje: Mensaje = new Mensaje(
                id,
                mensaje.text,
                date,
                newAuthor,
            )
            await dao.insertMensajes(newMensaje);

            if(mensaje.text.includes('administrador')) {
                console.log('MENSAJE SMS AL ADMIN')
                let msj = `El usuario ${mensaje.author.email} te envio el siguiente mensaje: ${mensaje.text}`;
                let rta = await twilio.enviarSMS(msj, '+5493571531154')
                loggerInfo.info(rta)
            }

            io.sockets.emit("messages", await getNormalizeMsj());
        });

        socket.emit("products", await dao.getProductos(), isAdmin);

        socket.on("filterProducto", async (filter: string[], filterBy: string) => {
            socket.emit("products", await dao.filterProducto(filter, filterBy), isAdmin);
        });

        socket.on("getAllProductos", async () => {
            socket.emit("products", await dao.getProductos());
        });

    });
}



// export const sockets = () => {
//     io.on("connection", async (socket) => {
//         socket.emit("messages", await dao.getMensajes());
//         socket.emit("products", await dao.getProductos(), isAdmin);
//         socket.on("newMessage", async (message: Mensaje) => {
//             const date = new Date().toLocaleString('es-AR');
//             const newMensaje: Mensaje = new Mensaje(
//                 message.author,
//                 date,
//                 message.text
//             )
//             await dao.insertMensajes(newMensaje);
//             io.sockets.emit("messages", await dao.getMensajes());
//         });

//         socket.on("filterProducto", async (filter: string[], filterBy: string) => {
//             socket.emit("products", await dao.filterProducto(filter, filterBy), isAdmin);
//         });
//         socket.on("getAllProductos", async () => {
//             socket.emit("products", await dao.getProductos());
//         });

//     });
// }



