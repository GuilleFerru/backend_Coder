import { Request, Response } from "express";
import { dao } from "./main";
import { app } from "./server"
import session from "express-session";
import { sockets } from "./sockets";
import { carritoAPI } from "./carritoAPI";
import { productoAPI } from "./productoAPI";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}

app.use(session({
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}));


export const loginAPI = () => {
    app.get('/login', (req: Request, res: Response) => {
        if (req.session.nombre) {
            res.status(200).json(req.session.nombre);
        }
        else {
            res.redirect('/')
        }
    })

    app.post('/home', async (req: Request, res: Response) => {
        const userOk = await dao.getUsuario(String(req.body.userName));
        if (userOk) {
            let { userName } = req.body;
            req.session.nombre = userName;
            sockets();
            productoAPI();
            carritoAPI();
            res.sendFile(process.cwd() + '/public/home.html');
        } else {
            req.session.nombre = undefined;
            res.redirect('/')

        }
    })


    app.get('/logout', (req: Request, res: Response) => {
        let nombre = req.session.nombre;
        if (nombre) {
            req.session.destroy(err => {
                console.log('destroy');

                if (!err) {
                    res.sendFile (process.cwd() + `/public/logout.html?nombre=${nombre}`);
                }
            })
        }
        else {
            // res.redirect('/')
        }
    })
}