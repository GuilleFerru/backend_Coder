"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarMail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'guillelf@gmail.com',
        pass: ''
    }
});
var enviarMail = function (asunto, mensaje, adjunto, to, cb) {
    var mailOptions = {
        from: 'Servidor Node.js',
        to: to,
        subject: asunto,
        html: mensaje,
        attachments: [
            {
                path: adjunto,
                filename: 'imgUser.jpg',
            }
        ]
    };
    transporter.sendMail(mailOptions, function (err, info) {
        cb(err, info);
    });
};
exports.enviarMail = enviarMail;
