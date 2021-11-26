import { accountSid, authToken } from './accountData';

import twilio from 'twilio';

const client = twilio(accountSid, authToken)

export const enviarSMS = async (mensaje: string, phone: string) => {
    try {
        let rta = await client.messages.create({
            body: mensaje,
            from: '+14692948136',
            to: phone
        })
        return rta
    }
    catch (error) {
        return error
    }
}