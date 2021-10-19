import { isAdmin, io } from "./server"
import { dao } from "./main";
import { Mensaje, Author } from "./interfaces/IMensaje";
import util from 'util';
import * as normalizr from 'normalizr';
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const normalizeMsj = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {

    const arrayOriginal: Array<any> = await dao.getMensajes();


    const arrayToString = JSON.stringify(arrayOriginal);
    const arrayParse = JSON.parse(arrayToString)



    const author = new normalizr.schema.Entity("author",
        undefined,
        {
            idAttribute: 'email',
        }
    );

    const text = new normalizr.schema.Entity("text",
        {
            author:author
        }
    );


    const post = new normalizr.schema.Entity("post", {
        author: author,
        text: text,
    });

    const chat = new normalizr.schema.Entity('chat', {
        authors: [author],
        posts: [post]
    })



    // const authorSchema = new normalizr.schema.Entity(
    //     'author',
    //     undefined,
    //     {
    //         idAttribute: 'email',
    //         mensajes: [mensajeSchema]

    //     }
    // );


    // const mensajeSchema = new normalizr.schema.Entity(
    //     'mensaje',
    //     {
    //         author: authorSchema
    //     });



    // const mensajesSchema = new normalizr.schema.Entity(
    //     'mensajes',
    //     {
    //         mensajes: [mensajeSchema]
    //     }
    // );

    const originalData = {
        id: '1',
        posts: arrayParse
    }


    console.log('NORMALIZACION');
    const normalizedMensajes: any = normalizr.normalize(originalData, chat);
    // console.log(JSON.stringify(normalizedMensajes).length);
    console.log(util.inspect(normalizedMensajes, false, 12, true));


    console.log('DESNORMALIZACION');
    const denormalizedMensajes = normalizr.denormalize(normalizedMensajes.result, chat, normalizedMensajes.entities);
  
    
    // console.log(JSON.stringify(denormalizedMensajes).length);
    console.log(util.inspect(denormalizedMensajes, false, 12, true));



    socket.emit("messages", normalizedMensajes, chat);

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
        io.sockets.emit("messages", await dao.getMensajes());
    });
}

const generateMensajeId = () => {
    return Math.floor(Math.random() * 8 + 1) + Math.random().toString().slice(2, 10);
}

export const sockets = () => {
    io.on("connection", async (socket) => {
        normalizeMsj(socket)
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



