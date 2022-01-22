import { Mensaje, MensajeWrap } from "../DAOs/interfaces/IMensaje";


export const MensajeDTO = (mensajes: Mensaje[]): MensajeWrap => ({
    id: '999',
    posts: mensajes
});