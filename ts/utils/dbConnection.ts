import mongoose from "mongoose";
import { loggerError, loggerInfo } from "../loggers";

const MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';


const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        loggerInfo.info('Connected to MongoDB');
    } catch (error) {
        loggerError.error(error);
    }
}

module.exports = {connectToMongo};
