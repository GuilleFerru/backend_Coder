import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        max: 100
    },
    text: {
        type: String,
        require: true,
        max: 500
    },
    date: {
        type: String,
        require: true,
        max: 200
    },
    author: {
        email: {
            type: String,
            require: true,
            max: 50
        },
        nombre: {
            type: String,
            require: true,
            max: 50
        },
        apellido: {
            type: String,
            require: true,
            max: 50
        },
        edad: {
            type: Number,
            require: true,
            max: 150
        },
        alias: {
            type: String,
            require: true,
            max: 50
        },
        avatar: {
            type: String,
            require: true,
            max: 200
        },
    },


});

export const mensajesModel = mongoose.model('mensajesNormalizr', mensajeSchema);