import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
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