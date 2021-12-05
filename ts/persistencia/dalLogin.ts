import { usuarioModel as User } from '../models/usuarios';
const db = require('../utils/dbConnection');

module.exports = {

   async findUser(username: string): Promise<any> {
        db.connectToMongo();
        return await User.findOne({ username: username })
    },


}