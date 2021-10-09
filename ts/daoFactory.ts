import { MemoryDao } from "./daos/MemoryDao";
import { FileSystemDao } from "./daos/FileSystemDao";
import { MySqlDao } from "./daos/MySqlDao";
import { SQLiteDao } from "./daos/SQLiteDao";
// import { MongoDbDao } from "./daos/MongoDbDao";
// import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";

import { IDao } from "./interfaces/IDao";

export class DaoFactory {

    memoria: any;
    fileSystem: any;
    mysqlDao: any;
    sqliteDao: any;
    static instancia: DaoFactory;


    constructor() {
        if (DaoFactory.instancia) {
            return DaoFactory.instancia;
        }
        this.memoria = new MemoryDao();
        this.fileSystem = new FileSystemDao();
        this.mysqlDao = new MySqlDao();
        this.sqliteDao = new SQLiteDao();
        DaoFactory.instancia = this;
    }

    getDao(opcion: number): IDao {
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
    }
}
