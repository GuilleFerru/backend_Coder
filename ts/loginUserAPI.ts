import { Request, Response } from "express";
import { app } from "./server"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { dao } from "./main";

declare module 'express-session' {
    export interface SessionData {
        nombre: { [key: string]: any };
    }
}



app.use(cookieParser())
app.use(session({
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}));


export const loginAPI = async () => {

    app.get('/login', (req, res) => {
        if (req.session.nombre) {
            res.render("home", {
                nombre: req.session.nombre
            })
        }
        else {
            res.sendFile(process.cwd() + '/public/login.html')
        }
    })

    app.post('/login', async (req: Request, res: Response) => {
        const userOk = await dao.getUsuario(String(req.body.userName));
        if (userOk) {
            let { userName } = req.body;
            req.session.nombre = userName;
            res.redirect('/')
        } else {
            res.redirect('/');
        }
    })

    app.get('/logout', (req: Request, res: Response) => {
        let nombre = req.session.nombre;
        if (nombre) {
            req.session.destroy(err => {
                console.log('destroy');
                if (!err) {
                    res.render("logout", { nombre })
                } else {
                    res.redirect('/')
                }
            })
        }
        else {
            res.redirect('/');
        }
    })

}