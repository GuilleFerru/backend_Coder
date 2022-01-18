"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
var MemoryDao_1 = require("./persistencia/dao/MemoryDao");
var FileSystemDao_1 = require("./persistencia/dao/FileSystemDao");
var MySqlDao_1 = require("./persistencia/dao/MySqlDao");
var SQLiteDao_1 = require("./persistencia/dao/SQLiteDao");
var MongoDbDao_1 = require("./persistencia/dao/MongoDbDao");
var MongoDbaaSDao_1 = require("./persistencia/dao/MongoDbaaSDao");
var loggers_1 = require("./loggers");
var FirebaseDao_1 = require("./persistencia/dao/FirebaseDao");
var instance = null;
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
    }
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
                loggers_1.loggerInfo.info('Eligio la opción SQLiteDao');
                return new SQLiteDao_1.SQLiteDao();
            case 5:
                loggers_1.loggerInfo.info('Eligio la opción MongoDbDao');
                return new MongoDbDao_1.MongoDbDao();
            case 6:
                loggers_1.loggerInfo.info('Eligio la opción MongoDbassSDao');
                return new MongoDbaaSDao_1.MongoDbaaSDao();
            case 7:
                loggers_1.loggerInfo.info('Eligio la opción FirebaseDao');
                return new FirebaseDao_1.FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
