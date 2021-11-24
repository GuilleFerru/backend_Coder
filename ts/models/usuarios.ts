import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    name: {
        type: String,
        require: true,
        max: 50
    },
    lastname: {
        type: String,
        require: true,
        max: 50
    },
    address: {
        type: String,
        require: true,
        max: 50
    },
    age: {
        type: Number,
        require: true,

    },
    phone: {
        type: String,
        max: 50
    },
    avatar: {
        type: String,
        max: 50
    },
    password: {
        type: String,
        require: true,
        max: 50
    },
},
    {
        timestamps: true
    },
);

export const usuarioModel = mongoose.model('users', usuarioSchema);

// import mongoose from 'mongoose';

// const usuarioSchema = new mongoose.Schema({

//     username: {
//         type: String,
//         require: true,
//         max: 50,
//     },
//     password: {
//         type: String,
//         require: true,
//         max: 50
//     }
// },
//     {
//         timestamps: true
//     },
// );

// export const usuarioModel = mongoose.model('users', usuarioSchema);