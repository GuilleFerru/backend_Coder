import nodemailer from 'nodemailer'
const config = require('../../config.js');

// Name	Donavon Sanford


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.NODEMAILER_ETHEREAL_USER,
        pass: config.NODEMAILER_ETHEREAL_PASS
    }
});

export const enviarMail = (asunto: string, mensaje: string, cb: any) => {
    const mailOptions = {
        from: 'Servidor Ecommerce Coder Guille Ferrucci',
        to: config.NODEMAILER_GMAIL_USER,
        subject: asunto,
        html: mensaje
    }
    transporter.sendMail(mailOptions, (err, info) => {
        cb(err, info)
    })
}