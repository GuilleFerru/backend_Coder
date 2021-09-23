"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessages = exports.mensajesFS = void 0;
var fs = __importStar(require("fs"));
exports.mensajesFS = (function () {
    var messages = [];
    fs.readFile("./messages.txt", "utf8", function (error, content) {
        if (error) {
            console.error("Hubo un error con fs.readFile de msj!");
        }
        else {
            var savedMessages = JSON.parse(content);
            savedMessages.forEach(function (message) {
                messages.push(message);
            });
        }
    });
    return messages;
})();
var saveMessages = function (messages) {
    try {
        fs.writeFileSync("./messages.txt", JSON.stringify(messages, null, "\t"));
    }
    catch (error) {
        console.log("Hubo un error");
    }
};
exports.saveMessages = saveMessages;
