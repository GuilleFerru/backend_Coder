import express from 'express';
import { Productos } from './Productos.mjs';
import {app} from './server.mjs';


const router = express.Router();
app.use("/api", router);

const producto = new Productos();

router.get('/productos/listar', (req, res) => {
    const newProducto = producto.getProductos();

    if (newProducto.length > 0) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'no hay productos cargados' })
    }
})

router.get('/productos/listar/:id', (req, res) => {
    const { id } = req.params;
    const newProducto = producto.getProductoById(id);
    if (newProducto) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

router.post('/productos/guardar', (req, res) => {
    const newProducto = req.body;

    if (newProducto.price && newProducto.title && newProducto.thumbnail) {
        producto.addProducto(newProducto)
        res.status(200).json(newProducto)
    } else {
        res.status(400).json({ error: 'Producto mal cargado' })
    }
})

router.put('/productos/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const newProducto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    }
    if (newProducto) {
        res.status(200).json(producto.updateProducto(newProducto, id, req))
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    const { id } = req.params;
    const productToBeDelete = producto.getProductoById(id);
    if (productToBeDelete) {
        res.status(200).json(producto.deleteProducto(productToBeDelete))
    } else {
        res.status(404).json({ error: 'producto no existente, no se puede borrar' })
    }
})