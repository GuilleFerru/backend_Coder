import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        max: 50,
    },
    password: {
        type: String,
        require: true,
        max: 50
    }
},
    {
        timestamps: true
    },
);

export const usuarioModel = mongoose.model('users', usuarioSchema);
