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
    },
    password: {
        type: String,
        require: true,
        max: 50
    }
}, {
    timestamps: true
});
exports.usuarioModel = mongoose_1.default.model('users', usuarioSchema);
