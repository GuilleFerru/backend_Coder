import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
    author : {
        type: String,
        require: true,
        max: 100
    },
    date : {
        type: String,
        require: true,
        max: 50
    },
    text : {
        type: String,
        require: true,
        max: 240
    },
});

export const mensajesModel = mongoose.model('mensajes', mensajeSchema);