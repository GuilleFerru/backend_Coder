import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
        max: 50,

    }
},
    {
        timestamps: true
    },
);

export const usuarioModel = mongoose.model('usuarios', usuarioSchema);
