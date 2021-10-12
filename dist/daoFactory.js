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
        if (DaoFactory.instancia) {
            return DaoFactory.instancia;
        }
        this.memoria = new MemoryDao_1.MemoryDao();
        this.fileSystem = new FileSystemDao_1.FileSystemDao();
        this.mysqlDao = new MySqlDao_1.MySqlDao();
        this.sqliteDao = new SQLiteDao_1.SQLiteDao();
        this.mongoDao = new MongoDbDao_1.MongoDbDao();
        this.mongoDaoAsS = new MongoDbaaSDao_1.MongoDbaaSDao();
        this.firebaseDao = new FirebaseDao_1.FirebaseDao();
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
            case 4:
                return this.mongoDao;
            case 5:
                return this.mongoDaoAsS;
            case 6:
                return this.firebaseDao;
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
