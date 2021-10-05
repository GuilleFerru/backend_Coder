"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajesModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mensajeSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        require: true,
        max: 100
    },
    date: {
        type: String,
        require: true,
        max: 50
    },
    text: {
        type: String,
        require: true,
        max: 240
    },
});
exports.mensajesModel = mongoose_1.default.model('mensajes', mensajeSchema);
