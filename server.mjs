import express from 'express';
import * as SocketIO from 'socket.io';


export const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.info(`Servidor listo en el puerto ${port}`);
});

export const io = new SocketIO.Server(server)

server.on("error", (error) => {
    console.error(error);
});
