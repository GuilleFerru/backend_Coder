interface IAuthor {
    email: string;
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
}

export class Author implements IAuthor {
    public email: string;
    public nombre: string;
    public apellido: string;
    public edad: number;
    public alias: string;
    public avatar: string;

    constructor(email: string, nombre: string, apellido: string, edad: number, alias: string, avatar: string,) {
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.alias = alias;
        this.avatar = avatar;
    }
}

interface IMensaje {
    id: string;
    text: string;
    date: string;
    author: Author;

}

export class Mensaje implements IMensaje {
    public id: string;
    public text: string;
    public date: string;
    public author: Author


    constructor(id: string, text: string, date: string, author: Author,) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.author = author;

    }
}


// interface IMensaje {
//     id: string;
//     nombre: string;
//     apellido: string;
//     edad: number;
//     alias: string;
//     text: string;
//     avatar: string;
//     date: string;
// }

// export class Mensaje implements IMensaje {
//     public id: string;
//     public nombre: string;
//     public apellido: string;
//     public edad: number;
//     public alias: string;
//     public text: string;
//     public avatar: string;
//     public date: string;

//     constructor(id: string, nombre: string, apellido: string, edad: number, alias: string, text: string, avatar: string, date: string) {
//         this.id = id;
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.edad = edad;
//         this.alias = alias;
//         this.text = text;
//         this.avatar = avatar;
//         this.date = date;
//     }
// }




// interface IMensaje {
//     author: string;
//     date: string;
//     text: string;
// }

// export class Mensaje implements IMensaje {

//     public author: string;
//     public date: string;
//     public text: string;

//     constructor(author: string, date: string, text: string) {
//         this.author = author;
//         this.date = date;
//         this.text = text;
//     }
// }