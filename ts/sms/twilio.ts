// Wilson%123654789
const accountSid = 'AC1471a99c86fe7bd44086726a5ae428eb';
const authToken = '13f70dd6571006a22939e7802da9b0ba';

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