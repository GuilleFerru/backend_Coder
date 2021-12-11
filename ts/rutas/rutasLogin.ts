import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { loggerError, loggerInfo, loggerWarn } from "../loggers";
import { usuarioModel as User } from '../models/usuarios';
import * as ethereal from "../email/nodemailerEthereal"


const controladorLogin = require('../controlador/controladorLogin');
const negocioLogin = require('../negocio/negocioLogin');
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


const routes = express.Router();

routes.get('/login', controladorLogin.getLogin);
routes.post('/login', passport.authenticate(controladorLogin.loginStrategyName(), { failureRedirect: '/faillogin' }), controladorLogin.postLogin);
routes.get('/faillogin', controladorLogin.getFailLogin);
routes.get('/logout', controladorLogin.getLogout);


routes.get('/register', controladorLogin.getRegister);
routes.post('/register', controladorLogin.upload.single("avatar"), passport.authenticate(signUpStrategyName, { failureRedirect: '/failregister' }), controladorLogin.postRegister);
routes.get('/failregister', controladorLogin.getFailRegister);


module.exports = routes;