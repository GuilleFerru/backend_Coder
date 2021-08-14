import express from 'express';

const app = express();
const port = 8080;
const server = app.listen(port, () => {
  console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error) => {
  console.error(error);
});