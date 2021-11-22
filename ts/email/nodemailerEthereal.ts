import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: '@ethereal.email',
        pass: ''
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
