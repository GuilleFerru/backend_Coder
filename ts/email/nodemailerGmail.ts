import nodemailer from 'nodemailer'
const config = require('../../config.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.NODEMAILER_GMAIL_USER,
        pass: config.NODEMAILER_GMAIL_PASS
    }
});

export const enviarMail = (asunto: string, mensaje: string, adjunto: string, to: any, cb: any) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: to,
        subject: asunto,
        html: mensaje,
        attachments: [
            {   // filename and content type is derived from path
                path: adjunto,
                filename: 'imgUser.jpg',
            }
        ]
    }

    transporter.sendMail(mailOptions, (err, info) => {
        cb(err, info)
    })
}