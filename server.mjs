import express from 'express';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error) => {
    console.error(error);
});

class Productos {
    constructor() {
        this.array = [];
        this.count = 0;
    }

    getArray() {
        return this.array;
    }

    getArrayById(id) {
        console.log(id)
        return this.array.filter(arr => arr.id === Number(id))
        // return this.array[id]
    }

    addElement(object) {
        this.array.push({ ...object, id: this.count + 1});
        this.count++;
        return object
    }

}

const productoUno = new Productos();


app.get('/api/productos/listar', (req, res) => {

    const objeto = productoUno.getArray();
    if (objeto.length > 0) {
        res.status(200).send(JSON.stringify(objeto))
    } else {
        res.status(404).send({ error: 'no hay productos cargados' })
    }

})

app.get('/api/productos/listar/:id', (req, res) => {
    
    const { id } = req.params;
    const objeto = productoUno.getArrayById(id);

    if (objeto.length > 0) {
        res.status(200).send(JSON.stringify(objeto[0]))
    } else {
        res.status(404).send({ error: 'no hay productos cargados' })
    }
})

app.post('/api/productos/guardar', (req, res)=>{

    const producto = req.body

    if(producto.price && producto.title && producto.thumbnail){
        productoUno.addElement(producto)
        res.status(200).send(producto)
    } else{
        res.status(400).send({ error: 'Producto mal cargado' })
    }
    
})