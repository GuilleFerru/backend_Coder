import { Mensaje, MensajeWrap } from "../../interfaces/IMensaje";


export const MensajeDTO = (mensajes: Mensaje[]): MensajeWrap => ({
    id: '999',
    posts: mensajes
});