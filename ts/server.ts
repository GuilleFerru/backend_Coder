import express from "express";
import cluster from 'cluster'

/* SERVER *//////////////////////////////////////////////////////////////////////////////

export const app = express();

const port: number = +process.argv[2] || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const server = app.listen(port, () => {
  console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error: string) => {
  console.error(error);
});












