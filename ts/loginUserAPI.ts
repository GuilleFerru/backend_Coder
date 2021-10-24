import { Request, Response } from "express";
import { dao } from "./main";
import { app } from "./server"
import session from "express-session";
import { sockets } from "./sockets";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: '',
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



export const loginAPI = () => {


    app.get('/login', (req: Request, res: Response) => {
        if (req.session.nombre) {
            res.status(200).json({ userName: `${req.session.nombre}` });
        }
        else {
            res.status(200).json({ userName: undefined });
        }
    })


    app.post('/login', async (req: Request, res: Response) => {
        const userOk = await dao.getUsuario(String(req.body.userName));
        if (userOk) {
            sockets();
            let { userName } = req.body;
            req.session.nombre = userName;
            res.status(200).json({ userName: `${req.session.nombre}` });
        } else {
            req.session.nombre = undefined;
            res.status(200).json({ userName: undefined });

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