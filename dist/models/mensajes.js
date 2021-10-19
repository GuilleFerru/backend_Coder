"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajesModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mensajeSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        require: true,
        max: 100
    },
    text: {
        type: String,
        require: true,
        max: 500
    },
    date: {
        type: String,
        require: true,
        max: 200
    },
    author: {
        email: {
            type: String,
            require: true,
            max: 50
        },
        nombre: {
            type: String,
            require: true,
            max: 50
        },
        apellido: {
            type: String,
            require: true,
            max: 50
        },
        edad: {
            type: Number,
            require: true,
            max: 150
        },
        alias: {
            type: String,
            require: true,
            max: 50
        },
        avatar: {
            type: String,
            require: true,
            max: 200
        },
    },
});
exports.mensajesModel = mongoose_1.default.model('mensajesNormalizr', mensajeSchema);
