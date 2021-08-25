import express from 'express';

export const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error) => {
    console.error(error);
});
