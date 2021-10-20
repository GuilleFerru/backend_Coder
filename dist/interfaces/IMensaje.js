"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensajeWrap = exports.Mensaje = exports.Author = void 0;
var Author = /** @class */ (function () {
    function Author(email, nombre, apellido, edad, alias, avatar) {
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.alias = alias;
        this.avatar = avatar;
    }
    return Author;
}());
exports.Author = Author;
var Mensaje = /** @class */ (function () {
    function Mensaje(id, text, date, author) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.author = author;
    }
    return Mensaje;
}());
exports.Mensaje = Mensaje;
var MensajeWrap = /** @class */ (function () {
    function MensajeWrap(id, posts) {
        this.id = id;
        this.posts = posts;
    }
    return MensajeWrap;
}());
exports.MensajeWrap = MensajeWrap;
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
