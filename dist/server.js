"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
var express_1 = __importDefault(require("express"));
/* SERVER */ /////////////////////////////////////////////////////////////////////////////
exports.app = (0, express_1.default)();
var port = 8080;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.server = exports.app.listen(port, function () {
    console.info("Servidor listo en el puerto " + port);
});
exports.server.on("error", function (error) {
    console.error(error);
});
// export const isAdmin: boolean = true;
// export const io = new SocketIO.Server(server);
/* cliente */ /////////////////////////////////////////////////////////////////////////////////
// app.use(express.static("./public"));
// app.get("/", (_: Request, res: Response) => {
//   return res.sendFile("index.html", { root: __dirname });
// });
