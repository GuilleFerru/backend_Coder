import bcrypt from 'bcrypt';
import { Session } from "../interfaces/ISession";
import { loggerError, loggerInfo } from '../loggers';
import { usuarioModel as User } from '../models/usuarios';

export const newSession = new Session();
const isValidPassword = (user: { password: any; }, password: any) => bcrypt.compareSync(password, user.password);
const db = require('../utils/dbConnection');


module.exports = {

    findUser: (_:any, username: any, password: any, done: any) => {
        db.connectToMongo();
        User.findOne({ 'username': username },
        (err: any, user: { password: any; }) => {
            // In case of any error, return using the done method
            if (err) {
                loggerError.info('Error in Login: ' + err);
                return done(err);
            }
            // Username does not exist, log error & redirect back
            if (!user) {
                loggerInfo.info('User Not Found with email ' + username);
                loggerInfo.info('message', 'User Not found.');
                return done(null, false)
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
                loggerInfo.info('Invalid Password');
                loggerInfo.info('message', 'Invalid Password');
                return done(null, false)
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
        }
    );
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