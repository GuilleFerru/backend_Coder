import { accountSid, authToken } from './accountData';
//monalenachavo6969
import twilio from 'twilio';

const client = twilio(accountSid, authToken)
const config = require('../../config.js');

export const enviarWsp = async (mensaje: string, phone: string) => {
    try {
        
        await client.messages.create({
            body: mensaje,
            from:  `whatsapp:${config.TWILIO_WSP}`,
            to: `whatsapp:${phone}`
            // to: `whatsapp:${config.TWILIO_PHONE}` 
        })

    }
    catch (error) {
        return error
    }
}