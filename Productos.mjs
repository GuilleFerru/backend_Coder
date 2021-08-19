export class Productos {
    constructor() {
        this.productos = [];
        this.count = 0;
    }

    getProductos() {
        return this.productos;
    }

    getProductoById(id) {
        return this.productos.find(element => element.id === Number(id))
        // return this.productos.filter(arr => arr.id === Number(id))
    }

    addProducto(object) {
        this.productos.push({ ...object, id: this.count + 1 });
        this.count++;
        return object
    }

    updateProducto(newProducto, id, req) {
        console.log(req)
        return this.productos[id - 1] = { ...newProducto, id: Number(id) }
    }

}

