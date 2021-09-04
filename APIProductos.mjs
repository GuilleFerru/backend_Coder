import express from 'express';
import { Productos } from './Productos.mjs';
import { app, io } from './server.mjs';
import fs from "fs";

const producto = new Productos();
const fileName = "./messages.txt";
const messages = [];

app.use(express.static("./public"));

app.get("/", (_, res) => {
    res.sendFile("index.html", { root: __dirname });
});


io.on('connection', socket => {
    socket.emit('loadProducts', producto.getProductos());
    socket.emit('messages', messages);
    socket.on('newMessage', message => {
        messages.push(message);
        io.sockets.emit("messages", messages);
        saveMessages(messages);
    })
});


(() => {
    fs.readFile(fileName, "UTF-8", (error, content) => {
        if (error) {
            console.error("Hubo un error con fs.readFile!");
        } else {
            const savedMessages = JSON.parse(content);
            savedMessages.forEach(message => {
                messages.push(message)
            });
        }
    })
})()

const saveMessages = (messages) => {

    try {
        fs.writeFileSync(
            fileName,
            JSON.stringify(messages, null, "\t")
        );
    } catch (error) {
        console.log("Hubo un error");
    }

}


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
        res.render('listOfProducts.hbs', {
            productos: productos,
            productosKeys: productosKeys,
            dataOk: true,
            buttonHref: '/',
            buttonDescription: 'Volver'
        })
    } else {
        res.render('listOfProducts.hbs', {
            dataOk: errorData,
            wrongTitle: 'No existen productos cargados',
            wrongDescription: 'Para visualizar los productos primero los debe registrar.',
            buttonHref: '/',
            buttonDescription: 'Cargar Producto'
        })
    }
})


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
        producto.addProducto(newProducto);
        io.sockets.emit('loadProducts', producto.getProductos())
        res.redirect(302, '/')
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