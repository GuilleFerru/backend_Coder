import mongoose from 'mongoose';



const productosSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        max: 50,
        
    },
    description: {
        type: String,
        
        require: true,
        max: 500,
        
    },
    code: {
        type: String,
        require: true,
        max: 20,
        unique: true
    },
    thumbnail: {
        type: String,
        require: true,
        max: 300
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    },
},
    {
        timestamps: true
    },
);

export const productoModel = mongoose.model('productos', productosSchema);
