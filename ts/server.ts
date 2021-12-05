import express from "express";
import handlebars from 'express-handlebars';
import { IDao } from "./interfaces/IDao";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import compression from 'compression'
import * as SocketIO from "socket.io";
import { loggerError, loggerInfo } from "./loggers";
/* SERVER *//////////////////////////////////////////////////////////////////////////////

export const app = express();

app.use(compression())

const port: any = process.env.PORT || +process.argv[2] || 8080;

// para que funcione nodemailer
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'))


export const server = app.listen(port, () => {
  loggerInfo.info(`Servidor listo en el puerto ${port}`)

});

export const io = new SocketIO.Server(server);
export const dao: IDao = new MongoDbaaSDao();


server.on("error", (error: string) => {
  loggerError.error(error);
});












