export class Productos {
    constructor() {
        this.array = [];
        this.count = 0;
    }

    getArray() {
        return this.array;
    }

    getObjectById(id) {
        return this.array.filter(arr => arr.id === Number(id))
    }

    addObject(object) {
        this.array.push({ ...object, id: this.count + 1 });
        this.count++;
        return object
    }

}

