"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var sessionsSchema = new mongoose_1.default.Schema({
    expires: {
        type: String,
    },
    session: {
        type: String
    }
});
exports.sessionModel = mongoose_1.default.model('sessions', sessionsSchema);
