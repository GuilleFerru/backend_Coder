import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema({

    expires: {
        type: String,

    },
    session: {
        type: String
    }
});

export const sessionModel = mongoose.model('sessions', sessionsSchema);
