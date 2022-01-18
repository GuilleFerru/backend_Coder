
import { MemoryDao } from "./persistencia/dao/MemoryDao";
import { FileSystemDao } from "./persistencia/dao/FileSystemDao";
import { MySqlDao } from "./persistencia/dao/MySqlDao";
import { SQLiteDao } from "./persistencia/dao/SQLiteDao";
import { MongoDbDao } from "./persistencia/dao/MongoDbDao";
import { IDao } from "./interfaces/IDao";
import { MongoDbaaSDao } from "./persistencia/dao/MongoDbaaSDao";
import { loggerInfo } from "./loggers";
import { FirebaseDao } from "./persistencia/dao/FirebaseDao";
let instance: any = null;

export class DaoFactory {

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
                loggerInfo.info('Eligio la opción MongoDbassSDao');
                return new MongoDbaaSDao();
            case 7:
                loggerInfo.info('Eligio la opción FirebaseDao');
                return new FirebaseDao();
            default:
                throw new Error("DAO no encontrado");
        }
    }
}