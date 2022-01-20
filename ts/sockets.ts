import { io, dao} from './app';
import {MongoClient} from "mongodb";
import MensajeRepository from "./repositories/MensajeRepository";
import { Mensaje, Author } from "./interfaces/IMensaje";
import { loggerError } from "./loggers";
import * as normalizr from 'normalizr';
import * as twilio from './twilio/sms.js';
import { newSession } from "./app";
import { MensajeDTO } from './persistencia/dto/MensajeDto';
import minimist from 'minimist';


const minimistArgs = minimist(process.argv.slice(2),{
    default:{ 
        port: 8080,
    }
});
const port = minimistArgs.port ;


const getNormalizeMsj = async (mensajeRepository: MensajeRepository | undefined) => {
    try {
        const mensajesOriginal: any = await mensajeRepository?.find();
        const mensajeDTO = MensajeDTO(mensajesOriginal);
        const mensajesOriginalToString = JSON.stringify(mensajeDTO);
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
    } catch (error) {
        loggerError.error(error);
    }

}

const generateMensajeId = () => {
    const hexa = [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    return String(hexa)
}

export const sockets = async () => {

    const connection: MongoClient | any = await MongoClient.connect(
        'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    const mensajeRepository: MensajeRepository = new MensajeRepository(connection.db("ecommerce"), "mensajesnormalizrs");
    console.log("Cliente conectado para mensajes");

    io.on("connection", async (socket) => {

        socket.emit("messages", await getNormalizeMsj(mensajeRepository));
        socket.emit('port', port)

        socket.on("newMessage", async (mensaje: Mensaje) => {

            const date = new Date().toLocaleString('es-AR');
            let id: string = generateMensajeId();
            const checkId = await mensajeRepository.findOne(id);

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

            await mensajeRepository.create(newMensaje);

            if (mensaje.text.includes('administrador')) {
                try {
                    let msj = `El usuario ${mensaje.author.email} te envio el siguiente mensaje: ${mensaje.text}`;
                    await twilio.enviarSMS(msj, '+5493571531154')
                }
                catch (error) {
                    loggerError.error('ERROR enviarWapp', error)
                }
            }

            io.sockets.emit("messages", await getNormalizeMsj(mensajeRepository));
        });

        socket.emit("products", await dao.getProductos(), newSession.getIsAdmin());

        socket.on("filterProducto", async (filter: string[], filterBy: string) => {
            socket.emit("products", await dao.filterProducto(filter, filterBy), newSession.getIsAdmin());
        });

        socket.on("getAllProductos", async () => {
            socket.emit("products", await dao.getProductos());
        });

    })

}






