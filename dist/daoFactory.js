"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
var MemoryDao_1 = require("./daos/MemoryDao");
var FileSystemDao_1 = require("./daos/FileSystemDao");
var MySqlDao_1 = require("./daos/MySqlDao");
var SQLiteDao_1 = require("./daos/SQLiteDao");
var MongoDbDao_1 = require("./daos/MongoDbDao");
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
var FirebaseDao_1 = require("./daos/FirebaseDao");
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
    }
    DaoFactory.prototype.getDao = function (opcion) {
        switch (opcion) {
            case 0:
                return new MemoryDao_1.MemoryDao();
            case 1:
                return new FileSystemDao_1.FileSystemDao();
            case 2:
                return new MySqlDao_1.MySqlDao();
            case 3:
                return new SQLiteDao_1.SQLiteDao();
            case 4:
                return new MongoDbDao_1.MongoDbDao();
            case 5:
                return new MongoDbaaSDao_1.MongoDbaaSDao();
            case 6:
                return new FirebaseDao_1.FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
