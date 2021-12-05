import { Request, Response } from "express";
import passport from 'passport';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { Strategy as LocalStrategy } from 'passport-local';
import { loggerError, loggerInfo, loggerWarn } from "../loggers";
import { usuarioModel as User } from '../models/usuarios';
import bcrypt from 'bcrypt';
import multer from "multer";
import * as ethereal from "../email/nodemailerEthereal"


const negocioLogin = require("../negocio/negocioLogin");
import { app } from "../app";
// const loginStrategyName = 'login';





const loginStrategyName = 'login';
const signUpStrategyName = 'signup';

const createHash = (password: any) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));






passport.use(signUpStrategyName, new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    const findOrCreateUser = () => {
        // find a user in Mongo with provided username
        User.findOne({ 'username': username }, function (err: string, user: any) {
            // In case of any error return
            if (err) {
                loggerError.info('Error in SignUp: ' + err);
                return done(err);
            }
            // already exists
            if (user) {
                loggerInfo.info('User already exists');
                loggerInfo.info('message', 'User Already Exists');
                return done(null, false)
            } else {
                // if there is no user with that email
                // create the user
                var newUser: any = new User();
                // set the user's local credentials  
                newUser.username = username;
                newUser.name = req.body.name;
                newUser.lastname = req.body.lastname;
                newUser.address = req.body.address;
                newUser.age = req.body.age;
                newUser.phone = req.body.phone;
                newUser.avatar = req.file?.path.replace('public', '');
                newUser.password = createHash(password);
                newUser.isAdmin = false;
                // save the user
                newUser.save(function (err: string) {
                    if (err) {
                        loggerInfo.info('Error in Saving user: ' + err);
                        throw err;
                    }
                    loggerInfo.info('User Registration succesful');
                    const asunto = `nuevo registro`
                    const mensaje = `Se ha creado el siguiente usuario: 
                    Nombre de Usuario: ${newUser.username}, <br> 
                    Nombre: ${newUser.name}, <br>
                    Apellido: ${newUser.lastname}, <br>
                    Dirección: ${newUser.address}, <br>
                    Edad: ${newUser.age}, <br>
                    Telefono: ${newUser.phone}, <br>
                    URL del avatar: ${newUser.avatar},<br>
                    Password encriptado: ${newUser.password}. <br>
                    Es administrador: ${newUser.isAdmin}. <br>
                    `
                    ethereal.enviarMail(asunto, mensaje, (err: any, info: any) => {
                        if (err) loggerError.error(err)
                        else loggerWarn.warn(info)
                    })

                    return done(null, newUser);
                });
            }
        });
    }
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
}))

passport.serializeUser(function (user: any, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err: any, user: any) {
        done(err, user);
    });
});

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        //En Atlas connect App: Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://ecommerce:3JUOQTzjfNkDKtnh@cluster0-shard-00-00.sl41s.mongodb.net:27017,cluster0-shard-00-01.sl41s.mongodb.net:27017,cluster0-shard-00-02.sl41s.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-o3g8d0-shard-0&authSource=admin&retryWrites=true&w=majority',
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1_000 * 3600
    }
}));

app.use(passport.initialize());
app.use(passport.session());


let userSession: any;
module.exports = {

    loginStrategyName: () => {
        
        passport.use(loginStrategyName, new LocalStrategy({
            passReqToCallback: true
        }, (_, username, password, done) => {
            negocioLogin.findUser(_, username, password, done)
        }
        ));
        return loginStrategyName;
    },

    getLogin: async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) {
            res.render("login", {
                enctype: 'application/x-www-form-urlencoded',
                formAction: "/login",
                title: 'Sign In',
                btnPrimaryTitle: 'SIGN IN',
                btnSecondaryTitle: 'SIGN UP',
                btnSecondaryAction: '/register'
            })
        } else {
            const { user } = req;
            userSession = await negocioLogin.getLogin(user);
            if (!userSession) {
                res.status(404).json({ error: "Hubo un problema con la sesion del usuario" });
            } else {
                res.render("home", {
                    email: userSession.email,
                    nombre: userSession.nombre,
                    img: userSession.avatar
                })
            }

        }
    },

    postLogin: async (req: Request, res: Response) => {
        res.redirect('/')
    },

    getFailLogin: async (req: Request, res: Response) => {
        res.render('error', {
            btnAction: '/login',
            errorText: 'Compruebe que el Usuario y/o la contraseña sean correctas.'
        });
    },

    getLogout: async (req: Request, res: Response) => {
        try {
            const nombre = userSession.nombre;
            req.logout();
            req.session.destroy(() => {
                res.render("logout", { nombre });
            })
        } catch (err) {
            res.render("logout", { nombre: '' })
        }

    }



}