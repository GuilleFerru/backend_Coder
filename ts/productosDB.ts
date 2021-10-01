import mongoose from "mongoose";
import { productoModel } from "./models/productos";
import { Product } from "./Product";

const MONGO_URL = 'mongodb://localhost:27017/ecommerce';



export const loadProductByIdFromDB = async (code: string) => {

    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        const savedProduct: Product | any = await productoModel.find({ code: code }, { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 });
        return savedProduct;
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Base de datos desconectada");

    }
};

export const loadProductsFromDB = async () => {
    const products: Array<string> = [];
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        const savedProducts = await productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        savedProducts.forEach((msg: string | any) => {
            products.push(msg);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Base de datos desconectada");
        return products;
    }
};

export const saveProductsToDB = async (product: Product) => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        await productoModel.insertMany(product)
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Base de datos desconectada");
    }
};