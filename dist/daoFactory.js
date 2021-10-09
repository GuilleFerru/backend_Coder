"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
var MemoryDao_1 = require("./daos/MemoryDao");
var FileSystemDao_1 = require("./daos/FileSystemDao");
var MySqlDao_1 = require("./daos/MySqlDao");
var SQLiteDao_1 = require("./daos/SQLiteDao");
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
        if (DaoFactory.instancia) {
            return DaoFactory.instancia;
        }
        this.memoria = new MemoryDao_1.MemoryDao();
        this.fileSystem = new FileSystemDao_1.FileSystemDao();
        this.mysqlDao = new MySqlDao_1.MySqlDao();
        this.sqliteDao = new SQLiteDao_1.SQLiteDao();
        DaoFactory.instancia = this;
    }
    DaoFactory.prototype.getDao = function (opcion) {
        switch (opcion) {
            case 0:
                return this.memoria;
            case 1:
                return this.fileSystem;
            case 2:
                return this.mysqlDao;
            case 3:
                return this.sqliteDao;
            // case 4:
            //     return new MongoDbDao();
            // case 5:
            //     return new MongoDbaaSDao();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
