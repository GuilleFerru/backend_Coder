import express from 'express';
import { Productos } from './Productos.mjs';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.info(`Servidor listo en el puerto ${port}`);
});

const producto = new Productos();

app.get('/api/productos/listar', (req, res) => {
    const newProducto = producto.getProductos();

    if (newProducto.length > 0) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'no hay productos cargados' })
    }
})

app.get('/api/productos/listar/:id', (req, res) => {
    const { id } = req.params;
    const newProducto = producto.getProductoById(id);
    if (newProducto) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

app.post('/api/productos/guardar', (req, res) => {
    const newProducto = req.body;

    if (newProducto.price && newProducto.title && newProducto.thumbnail) {
        producto.addProducto(newProducto)
        res.status(200).json(newProducto)
    } else {
        res.status(400).json({ error: 'Producto mal cargado' })
    }
})


app.put('/api/productos/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const newProducto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    }
    if (newProducto) {
        res.status(200).json(producto.updateProducto(newProducto, id,req))
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

server.on("error", (error) => {
    console.error(error);
});
