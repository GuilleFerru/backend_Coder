import { Request, Response } from "express";
import { dao } from "./main";
import { app } from "./server"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { sockets } from "./sockets";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}



app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1_000 * 600
    }
}));


export const loginAPI = async () => {

    app.post('/loadData', (req: Request, res: Response) => {

        const { userName } = req.body;
        if (userName) {
            req.session.nombre = userName;
            console.log('loadData ok', req.session.nombre);
            return res.status(200).json({ userName: userName, dataOk: true });
        }
        else {
            return res.status(200).json({ data: undefined });
        }
    })

    app.get('/sockets', async (req: Request, res: Response) => {
        if (req.session.nombre) {
            // await sockets();
            console.log('hola');

            return res.status(200).send('OK');
        }
        else {
            res.status(200).json({ userName: undefined });
        }
    })

    app.get('/login', (req: Request, res: Response) => {
        if (req.session.nombre) {
            res.status(200).json({ userName: `${req.session.nombre}` });
        }
        else {
            res.status(200).json({ userName: undefined });
        }
    })


    app.post('/login', (req: Request, res: Response) => {
        const userOk = req.body.userName;

        if (userOk !== '') {
            return res.redirect(307, '/loadData')
            // res.status(200).json({ userName: `${req.session.nombre}` });
        } else {
            return res.redirect(302, '/');
            // req.session.nombre = undefined;
            // res.status(200).json({ userName: undefined });

        }
    })


    app.get('/logout', (req: Request, res: Response) => {
        let nombre = req.session.nombre;
        if (nombre) {
            req.session.destroy(err => {
                console.log('destroy');
                if (!err) {
                    res.status(200).json({ userName: `${nombre}` });
                }
            })
        }
        else {
            res.status(200).json({ userName: undefined });
        }
    })

}