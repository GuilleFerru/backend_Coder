
const accountSid = '';
const authToken = '';

import twilio from 'twilio'

const client = twilio(accountSid, authToken)

export const enviarSMS = async (mensaje: string, numero: string) => {
    try {
        let rta = await client.messages.create({
            body: mensaje,
            from: '+14692948136',
            to: numero
        })
        return rta
    }
    catch (error) {
        return error
    }
}
