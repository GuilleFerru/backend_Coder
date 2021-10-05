interface IMensaje {
    author: string;
    date: string;
    text: string;
}

export class Mensaje implements IMensaje {

    public author: string;
    public date: string;
    public text: string;

    constructor(author: string, date: string, text: string) {
        this.author = author;
        this.date = date;
        this.text = text;
    }
}