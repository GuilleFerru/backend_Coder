import { Mensaje, MensajeWrap } from "../interfaces/IMensaje";
import { loggerError, loggerInfo } from "../loggers";
import { mensajesModel } from "../models/mensajes";

const mensajes: Mensaje[] = [];

module.exports = {
    
    getMensajeById(id: string): Mensaje | undefined {
        return mensajes.find((element) => String(element.id) === id);
    },

    async getMensajes(): Promise<MensajeWrap> {
        try {
            
            mensajes.splice(0, mensajes.length);
            const savedMensajes = await mensajesModel.find({}, { __v: 0, _id: 0 })
            
            savedMensajes.forEach((mensaje: Mensaje | any) => {
                mensajes.push(mensaje);
            })
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            const wrapMensajes = new MensajeWrap('999', mensajes);
            return wrapMensajes;
        }
    },

    async insertMensajes(mensaje: Mensaje) {
        try {
            await mensajesModel.insertMany(mensaje)
            mensajes.push(mensaje);
        } catch (error) {
            loggerError.error(error);
            throw error;
        } finally {
            loggerInfo.info('Mensaje Agregado');
        }
    }

}