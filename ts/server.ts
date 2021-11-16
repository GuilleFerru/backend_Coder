import express from "express";
import compression from 'compression'
import { loggerError, loggerInfo } from "./loggers";
/* SERVER *//////////////////////////////////////////////////////////////////////////////

export const app = express();

app.use(compression())

const port: any = process.env.PORT || +process.argv[2] || 8080;
console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const server = app.listen(port, () => {
  loggerInfo.info(`Servidor listo en el puerto ${port}`)

});

server.on("error", (error: string) => {
  loggerError.error(error);
});












