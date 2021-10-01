import mongoose from "mongoose";
import { mensajesModel } from "./models/mensajes";

const MONGO_URL = 'mongodb://localhost:27017/ecommerce';

export const loadMessagesFromDB = async () => {
  const messages: Array<string> = [];
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectada");
    const savedMessages = await mensajesModel.find({}, { __v: 0, _id: 0 })
    savedMessages.forEach((msg: string | any) => {
      messages.push(msg);
    })
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
    return messages;
  }
};

export const saveMessageToDB = async (message: string) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectada");
    await mensajesModel.insertMany(message)
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};





