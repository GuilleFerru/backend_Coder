interface IUsuario {
    username: string;
    password: string
}

export class Usuario implements IUsuario {
    public username: string;
    public password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}