import { MemoryDao } from "./daos/MemoryDao";
import { FileSystemDao } from "./daos/FileSystemDao";
import { MySqlDao } from "./daos/MySqlDao";
import { SQLiteDao } from "./daos/SQLiteDao";
import { MongoDbDao } from "./daos/MongoDbDao";
import { IDao } from "./interfaces/IDao";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import { FirebaseDao } from "./daos/FirebaseDao";

export class DaoFactory {

    


    constructor() {

    }

    getDao(opcion: number): IDao {
        switch (opcion) {
            case 0:
                return new MemoryDao();
            case 1:
                return new FileSystemDao();
            case 2:
                return new MySqlDao();
            case 3:
                return new SQLiteDao();
            case 4:
                return new MongoDbDao();
            case 5:
                return new MongoDbaaSDao();
            case 6:
                return new FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    }
}
