const axios = require("axios").default;

let path = 'http://localhost:8080';
// #region GET

const getProductos = async (idParam) => {
    try {
        const id = idParam === undefined ? undefined : idParam;
        // console.log('getProductos', id);
        const url = `${path}/productos/listar/${id}`
        const response = await axios.get(url);
        if (response.status === 200) {
            console.log('Status ', response.status, 'Data ', response.data);
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getIdLastAddedProduct = async () => {
    try {
        const url = `${path}/productos/listar/`
        const response = await axios.get(url);

        if (response.status === 200) {
            const lastProduct = response.data[response.data.length - 1];
            const id = lastProduct._id;
            console.log('Id del ultimo producto agregado', id);
            return id;
        }
    }
    catch (error) {
        console.error(error);
        return error;
    }
}

// #region POST
const postProducto = async () => {
    try {
        const url = `${path}/productos/agregar`
        const response = await axios.post(url, {
            title: 'Producto prueba axios',
            description: 'Descripcion de prueba axios',
            code: 'axios',
            thumbnail: 'https://axios-http.com/assets/logo.svg',
            price: 1,
            stock: 10
        })
        if (response.status === 201) {
            console.log(response.status, response.data);
            const id = await getIdLastAddedProduct();
            await getProductos(id);
        }
    } catch (error) {
        console.error('error');
    }
};


// #region PUT
const updateProducto = async (id) => {
    try {
        console.log('Id del producto a actualizar', id);
        const response = await axios.put(`${path}/productos/actualizar/${id}`, updatedProduct);
        if (response.status === 200) {
            console.log('Status ', response.status, 'Actualizado ', response.data);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteProducto = async (id) => {
    try {
        console.log('Id del producto a borrar', id);
        const response = await axios.delete(`${path}/productos/borrar/${id}`);
        console.log('Status ', response.status, 'Actualizado ', response.data);

    } catch (error) {
        console.error(error);
    }
};


const GETPRODUCTOS = 0;
const GETPRODUCTOBYID = 1;
const POSTPRODUCTO = 2;
const UPDATEPRODUCTO = 3;
const UPDATELASTADDEDPRODUCTO = 4;
const DELETEPRODUCTO = 5;
const DELETELASTADDEDPRODUCTO = 6;


const OPCION = POSTPRODUCTO;
const id = '61bf78bf9138e81aaf0f869e';

const updatedProduct = {
    title: 'Updated prueba axios',
    description: 'Update de prueba axios',
    code: 'axios',
    thumbnail: 'https://axios-http.com/assets/logo.svg',
    price: 1,
    stock: 10
}

const ejecutarTest = (OPCION, id) => {
    switch (OPCION) {
        case 0:
            return getProductos();
        case 1:
            return getProductos(id);
        case 2:
            return postProducto();
        case 3:
            return updateProducto(id);
        case 4:
            return ((async () => {
                updateProducto(await getIdLastAddedProduct());
            }))()
        case 5:
            deleteProducto(id);
        case 6:
            return ((async () => {
                deleteProducto(await getIdLastAddedProduct());
            }))()
        default:
            throw new Error("DAO no encontrado");
    }
}

ejecutarTest(OPCION, id);

