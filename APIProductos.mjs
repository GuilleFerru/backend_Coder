import express from 'express';
import { Productos } from './Productos.mjs';
import { app } from './server.mjs';
// import handlebars from "express-handlebars";
// import path from 'path';

// const __dirname = path.resolve();
const producto = new Productos();

// app.engine(
//     'pug',
//     handlebars({
//         extname: '.pug',
//         defaultLayout: 'index.pug',
//         layoutsDir: __dirname + '/views/layouts'
//     })
// );

app.set('view engine', 'ejs');
// app.set('views', './views');

app.get('/', (_, res) => {

    res.render('pages/index.ejs', {
        dataOk: false
        ,
        inputInfo: [
            {
                tag: 'title',
                name: 'Nombre',
                placeholder: 'Ingrese Nombre',
                type: 'text'
            },
            {
                tag: 'price',
                name: 'Precio',
                placeholder: 'Ingrese precio',
                type: 'number'
            },
            {
                tag: 'thumbnail',
                name: 'URL foto',
                placeholder: 'Ingrese URL',
                type: 'text'
            }
        ]
    })
})


const getTablaRows = (req, _, next) => {
    req.productos = producto.getProductos()
    if (req.productos.length > 0) {
        req.errorData = true
    } else {
        req.errorData = false
    }
    next();
};

const getTablaHeaders = (req, _, next) => {
    req.productosKeys = ['Nombre', 'Precio', 'Foto'];
    next();
};

app.get('/productos/vista', getTablaRows, getTablaHeaders, (req, res) => {
    const { productos, productosKeys, errorData } = req;
    if (productos.length > 0) {
        res.render('partials/listOfProducts.ejs', {
            productos: productos,
            productosKeys: productosKeys,
            dataOk: true,
            buttonHref: '/',
            buttonDescription: 'Volver'
        })
    } else {
        res.render('partials/listOfProducts.ejs', {
            dataOk: errorData,
            wrongTitle: 'No existen productos cargados',
            wrongDescription: 'Para visualizar los productos primero los debe registrar.',
            buttonHref: '/',
            buttonDescription: 'Cargar Producto'
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////////

const routerAPI = express.Router();
app.use("/api", routerAPI);

routerAPI.get('/productos/listar', (_, res) => {
    const newProducto = producto.getProductos();

    if (newProducto.length > 0) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'no hay productos cargados' })
    }
})

routerAPI.get('/productos/listar/:id', (req, res) => {
    const { id } = req.params;
    const newProducto = producto.getProductoById(id);
    console.log(Object.keys(newProducto))
    if (newProducto) {
        res.status(200).json(newProducto)
    } else {
        res.status(404).json({ error: 'producto no encontrado' })
    }
})

routerAPI.post('/productos/guardar', (req, res) => {
    const newProducto = req.body;

    if (newProducto.price && newProducto.title && newProducto.thumbnail) {
        producto.addProducto(newProducto)
        
        res.redirect(302,'/')
    } else {
        res.status(400).json({ error: 'Producto mal cargado' })
    }
})

routerAPI.put('/productos/actualizar/:id', (req, res) => {
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

routerAPI.delete('/productos/borrar/:id', (req, res) => {
    const { id } = req.params;
    const productToBeDelete = producto.getProductoById(id);
    if (productToBeDelete) {
        res.status(200).json(producto.deleteProducto(productToBeDelete))
    } else {
        res.status(404).json({ error: 'producto no existente, no se puede borrar' })
    }
})