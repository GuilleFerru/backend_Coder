import mongoose from "mongoose";
import { productoModel } from "./models/productos";
import { Product } from "./Product";

const MONGO_URL = 'mongodb://localhost:27017/ecommerce';



export const updateProductByIdFromDB = async (id: string, product: Product) => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        const savedProduct: Product | any = await productoModel.updateOne({ _id: id }, {
            $set: {
                title: product.title,
                description: product.description,
                code: product.code,
                thumbnail: product.thumbnail,
                price: product.price,
                stock: product.stock
            }
        }, { multi: true });
        return savedProduct;
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Base de datos desconectada");
    }
};


export const deleteProductByIdFromDB = async (id: string) => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        const savedProduct: Product | any = await productoModel.deleteMany({ _id: id });
        return savedProduct;
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Base de datos desconectada");
    }
};

export const loadProductByIdFromDB = async (id: string) => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
        const savedProduct: Product | any = await productoModel.findOne({ _id: id }, { __v: 0, createdAt: 0, updatedAt: 0 });
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