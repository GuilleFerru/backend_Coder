"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var loggers_1 = require("./loggers");
/* SERVER */ /////////////////////////////////////////////////////////////////////////////
exports.app = (0, express_1.default)();
exports.app.use((0, compression_1.default)());
var port = +process.argv[2] || 8080;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.server = exports.app.listen(port, function () {
    loggers_1.loggerInfo.info("Servidor listo en el puerto " + port);
});
exports.server.on("error", function (error) {
    loggers_1.loggerError.error(error);
});
