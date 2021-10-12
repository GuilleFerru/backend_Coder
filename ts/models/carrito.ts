import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({

    quantity: {
        type: Number,
        require: true,
        max: 50,
    },
    producto: {
        type: Object,
        require: true,
        
    },
    cerrado: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    },
);

export const carritoModel = mongoose.model('carritos', carritoSchema);
