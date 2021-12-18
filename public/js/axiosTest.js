const axios = require("axios").default;

let port = '8080';
// #region GET

(async (id) => {
    try {
        const url = `http://localhost:${port}/productos/listar/${id}`
        const response = await axios.get(url);
        console.log("GET PRODUCTOS", response.data);
    } catch (error) {
        console.error(error);
    }
})();

// #region POST
(async () => {
    try {
        const url = `http://localhost:${port}/productos/agregar`
        const response = await axios.post(url, {
            title: 'Producto de prueba axios',
            description: 'Producto de prueba axios',
            code: 'axios',
            thumbnail: 'https://axios-http.com/assets/logo.svg',
            price: 1,
            stock: 10
        })
        console.log("POST PRODUCTO", response.data);

    } catch (error) {
        console.error(error);
    } finally {
        const url = `http://localhost:${port}/productos/listar/`
        const response = await axios.get(url);
        console.log("GET PRODUCTOS", response.data);
    }
})();

// #region PUT
(async () => {
    try {
        const url = `http://localhost:${port}/productos/listar/`
        const responseGet = await axios.get(url);
        const testObject = responseGet.data[responseGet.data.length - 1];
        const id = testObject._id
        console.log(id)
        const responsePut = await axios.put(`http://localhost:${port}/productos/actualizar/${id}`, {
            title: 'Producto modificado de prueba axios',
            description: 'Producto modificado de prueba axios',
            code: 'axios',
            thumbnail: 'https://axios-http.com/assets/logo.svg',
            price: 1,
            stock: 10
        });
        if (responsePut.data === true) {
            console.log("Producto modificado correctamente");
        }
    } catch (error) {
        console.error(error);
    } finally {
        const url = `http://localhost:${port}/productos/listar/`
        const responseGet = await axios.get(url);
        console.log("GET PRODUCTOS MODIFICADOS", responseGet.data);
    }
})();