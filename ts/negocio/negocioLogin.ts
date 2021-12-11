import bcrypt from 'bcrypt';
import { newSession } from '../app';
import { loggerError, loggerInfo, loggerWarn } from '../loggers';
import { usuarioModel as User } from '../models/usuarios';
import multer from "multer";
import * as ethereal from "../email/nodemailerEthereal"



const isValidPassword = (user: { password: any; }, password: any) => bcrypt.compareSync(password, user.password);
const createHash = (password: any) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


const dalLogin = require("../persistencia/dalLogin");


module.exports = {

    findUser: async (_: any, username: any, password: any, done: any) => {

        const user: any = await dalLogin.findUser(username);
        if (!user) {

            return done(null, false, { message: 'Usuario no encontrado' });
        }
        if (!isValidPassword(user, password)) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        return done(null, user);
    },

    getLogin: (user: any) => {
        newSession.setNombre(`${user.name} ${user.lastname}`);
        newSession.setEmail(`${user.username}`)
        newSession.setPhone(`${user.phone}`)
        newSession.setAvatar(`${user.avatar}`)
        newSession.setIsAdmin(user.isAdmin);
        return {
            nombre: newSession.getNombre(),
            email: newSession.getEmail(),
            avatar: newSession.getAvatar(),
        };
    },


    isValidPassword(user: any, password: string): boolean {
        return bcrypt.compareSync(password, user.password);
    }
}

