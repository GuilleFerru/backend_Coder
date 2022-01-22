import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    productos: {
        type: Array,
        require: true,
    },
    orderTotal: {
        type: Object,
        require: true,
    },
},
    {
        timestamps: true
    },
);

export const ordenModel = mongoose.model('ordenes', orderSchema);
