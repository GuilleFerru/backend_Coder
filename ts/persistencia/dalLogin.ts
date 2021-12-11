import { usuarioModel as User } from '../models/usuarios';

module.exports = {

    async findUser(username: string): Promise<any> {
        
        const user = await User.findOne({ username: username })
        
        return user;
    },


}