"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var carritoSchema = new mongoose_1.default.Schema({
    quantity: {
        type: Number,
        require: true,
        max: 50,
    },
    producto: {
        type: Object,
        require: true,
    },
    cerrado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.carritoModel = mongoose_1.default.model('carritos', carritoSchema);
