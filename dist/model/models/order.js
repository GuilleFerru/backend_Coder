"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.default.Schema({
    productos: {
        type: Array,
        require: true,
    },
    orderTotal: {
        type: Object,
        require: true,
    },
}, {
    timestamps: true
});
exports.ordenModel = mongoose_1.default.model('ordenes', orderSchema);
