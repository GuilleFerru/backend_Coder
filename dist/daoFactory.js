"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
var MemoryDao_1 = require("./persistencia/MemoryDao");
var FileSystemDao_1 = require("./persistencia/FileSystemDao");
var MySqlDao_1 = require("./persistencia/MySqlDao");
var MongoDbaaSDao_1 = require("./persistencia/MongoDbaaSDao");
var loggers_1 = require("./loggers");
// import { FirebaseDao } from "./daos/FirebaseDao";
var instance = null;
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
    }
    // static opcion = 100;
    // private constructor() {
    // }
    DaoFactory.getInstance = function () {
        if (!instance) {
            instance = new DaoFactory();
        }
        return instance;
    };
    DaoFactory.prototype.getDao = function (opcion) {
        switch (opcion) {
            case 1:
                loggers_1.loggerInfo.info('Eligio la opción MemoryDao');
                return new MemoryDao_1.MemoryDao();
            case 2:
                loggers_1.loggerInfo.info('Eligio la opción FileSystemDao');
                return new FileSystemDao_1.FileSystemDao();
            case 3:
                loggers_1.loggerInfo.info('Eligio la opción MySqlDao');
                return new MySqlDao_1.MySqlDao();
            case 4:
            // return new SQLiteDao();
            case 5:
            // return new MongoDbDao();
            case 6:
                return new MongoDbaaSDao_1.MongoDbaaSDao();
            case 7:
            // return new FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
