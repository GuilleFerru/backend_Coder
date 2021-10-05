"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var productosSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
        max: 50,
    },
    description: {
        type: String,
        require: true,
        max: 500,
    },
    code: {
        type: String,
        require: true,
        max: 20,
        unique: true
    },
    thumbnail: {
        type: String,
        require: true,
        max: 300
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    },
}, {
    timestamps: true
});
exports.productoModel = mongoose_1.default.model('productos', productosSchema);
