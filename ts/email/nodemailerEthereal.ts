import nodemailer from 'nodemailer'
const config = require('../../config.js');

// Name	Donavon Sanford
// Username	kr4zsiupbsndpjgc@ethereal.email (also works as a real inbound email address)
// Password	VB9TCk2tnDp6pPAMV8

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
        to: 'guillelf@gmail.com',
        subject: asunto,
        html: mensaje
    }
    transporter.sendMail(mailOptions, (err, info) => {
        cb(err, info)
    })
}