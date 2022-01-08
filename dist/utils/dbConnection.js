"use strict";
// import mongoose from "mongoose";
// import { loggerError, loggerInfo } from "../loggers";
// const MONGO_URL = 'mongodb+srv://ecommerce:3JUOQTzjfNkDKtnh@cluster0.sl41s.mongodb.net/ecommerce?retryWrites=true&w=majority';
// let instance: any = null;
// export class Singleton {
//     private constructor() {
//         this.connectToMongo();
//     }
//     public static getInstance(): Singleton {
//         if (!instance) {
//             instance = new Singleton();
//         }
//         return instance;
//     }
//     connectToMongo = async () => {
//         try {
//             await mongoose.connect(MONGO_URL);
//             loggerInfo.info('Connected to MongoDB', mongoose.connection.readyState);
//         } catch (error) {
//             loggerError.error(error);
//         }
//     }
//     disconnectFromMongo = async () => {
//         try {
//             await mongoose.disconnect();
//             loggerInfo.info('Disconnected from MongoDB');
//         } catch (error) {
//             loggerError.error(error);
//         }
//     }
// }
