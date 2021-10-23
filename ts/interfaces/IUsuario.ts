interface IUsuario {
    userName: string;
}

export class Usuario implements IUsuario {
    public userName: string;

    constructor(userName: string) {
        this.userName = userName;
    }
}