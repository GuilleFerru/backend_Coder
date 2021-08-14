import express from 'express';
import {Productos} from './Productos.mjs';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.info(`Servidor listo en el puerto ${port}`);
});

const productoObject = new Productos();

app.get('/api/productos/listar', (req, res) => {
    const objeto = productoObject.getArray();

    if (objeto.length > 0) {
        res.status(200).json(objeto)
    } else {
        res.status(404).json({ error: 'no hay productos cargados' })
    }
})

app.get('/api/productos/listar/:id', (req, res) => {
    const { id } = req.params;
    const objeto = productoObject.getObjectById(id);

    if (objeto.length > 0) {
        res.status(200).json((objeto[0]))
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

app.post('/api/productos/guardar', (req, res) => {
    const producto = req.body;

    if (producto.price && producto.title && producto.thumbnail) {
        productoObject.addObject(producto)
        res.status(200).json(producto)
    } else {
        res.status(400).json({ error: 'Producto mal cargado' })
    }
})

server.on("error", (error) => {
    console.error(error);
});
