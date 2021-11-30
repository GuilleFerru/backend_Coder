import { accountSid, authToken } from './accountData';

import twilio from 'twilio';

const client = twilio(accountSid, authToken)

export const enviarWsp = async (mensaje: string) => {
    try {
        await client.messages.create({
            body: mensaje,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+'
        })

    }
    catch (error) {
        return error
    }
}