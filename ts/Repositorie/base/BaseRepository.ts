import {
    Db,
    Collection,  
    ObjectId,
} from "mongodb";

import IWrite from "../interfaces/IWrite";
import IRead from "../interfaces/IRead";

export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    public readonly collection: Collection;

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    async create(item: T): Promise<boolean> {
        const result: any = await this.collection.insertOne(item);
        return !!result;
    }

    async find(): Promise<T[]> {
        const itemsFound: any = await this.collection.find({}).toArray()
        return itemsFound;
    }

    async findOne(id: string): Promise<T> {
        const itemFound: any = await this.collection.findOne({_id:new ObjectId(id)})
        return itemFound;
    }
}
