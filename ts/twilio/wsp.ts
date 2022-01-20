import { accountSid, authToken } from './accountData';
//monalenachavo6969
import twilio from 'twilio';

const client = twilio(accountSid, authToken)
const config = require('../../config.js');

export const enviarWsp = async (mensaje: string) => {
    try {
        await client.messages.create({
            body: mensaje,
            from:  `whatsapp:${config.TWILIO_WSP}`,
            to: `whatsapp:${config.TWILIO_PHONE}` 
        })

    }
    catch (error) {
        return error
    }
}