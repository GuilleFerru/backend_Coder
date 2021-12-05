"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSession = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var ISession_1 = require("../interfaces/ISession");
var loggers_1 = require("../loggers");
var usuarios_1 = require("../models/usuarios");
exports.newSession = new ISession_1.Session();
var isValidPassword = function (user, password) { return bcrypt_1.default.compareSync(password, user.password); };
var db = require('../utils/dbConnection');
module.exports = {
    findUser: function (_, username, password, done) {
        db.connectToMongo();
        usuarios_1.usuarioModel.findOne({ 'username': username }, function (err, user) {
            // In case of any error, return using the done method
            if (err) {
                loggers_1.loggerError.info('Error in Login: ' + err);
                return done(err);
            }
            // Username does not exist, log error & redirect back
            if (!user) {
                loggers_1.loggerInfo.info('User Not Found with email ' + username);
                loggers_1.loggerInfo.info('message', 'User Not found.');
                return done(null, false);
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
                loggers_1.loggerInfo.info('Invalid Password');
                loggers_1.loggerInfo.info('message', 'Invalid Password');
                return done(null, false);
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
        });
    },
    getLogin: function (user) {
        exports.newSession.setNombre(user.name + " " + user.lastname);
        exports.newSession.setEmail("" + user.username);
        exports.newSession.setPhone("" + user.phone);
        exports.newSession.setAvatar("" + user.avatar);
        exports.newSession.setIsAdmin(user.isAdmin);
        return {
            nombre: exports.newSession.getNombre(),
            email: exports.newSession.getEmail(),
            avatar: exports.newSession.getAvatar(),
        };
    },
    isValidPassword: function (user, password) {
        return bcrypt_1.default.compareSync(password, user.password);
    }
};
