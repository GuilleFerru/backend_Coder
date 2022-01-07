
import { MemoryDao } from "./persistencia/MemoryDao";
import { FileSystemDao } from "./persistencia/FileSystemDao";
import { MySqlDao } from "./persistencia/MySqlDao";
import { SQLiteDao } from "./persistencia/SQLiteDao";
import { MongoDbDao } from "./persistencia/MongoDbDao";
import { IDao } from "./interfaces/IDao";
import { MongoDbaaSDao } from "./persistencia/MongoDbaaSDao";
import { loggerInfo } from "./loggers";
// import { FirebaseDao } from "./daos/FirebaseDao";
let instance: any = null;

export class DaoFactory {

    // static opcion = 100;

    // private constructor() {

    // }

    public static getInstance(): DaoFactory {
        if (!instance) {
            instance = new DaoFactory();
        }
        return instance;
    }

    getDao(opcion: number): IDao {
        switch (opcion) {
            case 1:
                loggerInfo.info('Eligio la opción MemoryDao');
                return new MemoryDao();
            case 2:
                loggerInfo.info('Eligio la opción FileSystemDao');
                return new FileSystemDao();
            case 3:
                loggerInfo.info('Eligio la opción MySqlDao');
                return new MySqlDao();
            case 4:
                loggerInfo.info('Eligio la opción SQLiteDao');
            return new SQLiteDao();
            case 5:
                loggerInfo.info('Eligio la opción MongoDbDao');
            return new MongoDbDao();
            case 6:
                return new MongoDbaaSDao();
            case 7:
            // return new FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    }
}