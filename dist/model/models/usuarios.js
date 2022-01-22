"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usuarioSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    name: {
        type: String,
        require: true,
        max: 50
    },
    lastname: {
        type: String,
        require: true,
        max: 50
    },
    address: {
        type: String,
        require: true,
        max: 50
    },
    age: {
        type: Number,
        require: true,
    },
    phone: {
        type: String,
        max: 50
    },
    avatar: {
        type: String,
        max: 50
    },
    password: {
        type: String,
        require: true,
        max: 50
    },
    isAdmin: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true
});
exports.usuarioModel = mongoose_1.default.model('users', usuarioSchema);
// import mongoose from 'mongoose';
// const usuarioSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         require: true,
//         max: 50,
//     },
//     password: {
//         type: String,
//         require: true,
//         max: 50
//     }
// },
//     {
//         timestamps: true
//     },
// );
// export const usuarioModel = mongoose.model('users', usuarioSchema);
