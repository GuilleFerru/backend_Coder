const { fromEvent } = rxjs;
const socket = io();

fromEvent(window, 'load').subscribe(() => {
    const newForm = formTemplate({ inputInfo });
    document.getElementById('productsForm').innerHTML = newForm;
});


/* NO MUESTRO MAS LA TABLA */
// socket.on('loadProducts', (productos) => {
//     const newTable = tableTemplate({
//         productos: productos,
//         productosKeys: productosKeys
//     });
//     document.getElementById('productsTable').innerHTML = newTable;
// });

socket.on('messages', (messages) => {
    const newChat = chatTemplate({ messages })
    document.getElementById('productsChat').innerHTML = newChat;
});

socket.on('products', (productos) => {
    const cardProducts = cardsTemplate({
        productos: productos,
        inputInfo: inputInfo,

    })
    document.getElementById('productsCard').innerHTML = cardProducts;
});


const addProduct = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    const _data = {
        title: title,
        description: description,
        code: code,
        thumbnail: thumbnail,
        price: price,
        stock: stock
    }
    fetch('http://localhost:8080/productos/agregar', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => {
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('code').value = '';
            document.getElementById('thumbnail').value = '';
            document.getElementById('price').value = '';
            document.getElementById('stock').value = '';
        })
        .catch(error => console.log(error))
}


const deleteProduct = (id) => {

    const url = `http://localhost:8080/productos/borrar/${id}`
    fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => {
        })
        .catch(error => console.log(error))
}


const passIdProductToModal = (id) => {
    const url = `http://localhost:8080/productos/listar/${id}`
    fetch(url, {
        method: "GET",
    }).then(response => response.json()).then(product => {
        delete product.id;
        delete product.timestamp;
        inputInfo.map(inputValue => {
            inputValue['value'] = product[inputValue.tag];
            
        })
        console.log(inputInfo);
        const modalProduct = modalTemplate({ inputInfo })
        document.getElementById('modalForm').innerHTML = modalProduct;
    })
        .catch(error => console.log(error))
}






const addMessage = () => {
    const author = document.getElementById("emailChat").value;
    const text = document.getElementById("chatText").value;
    const date = new Date().toLocaleString("es-AR", "DD-M-YYYY HH:MM:SS");
    if ((/$^|.+@.+..+/).test(author) && author !== "") {
        const message = {
            author: author,
            date: date,
            text: text,
        }
        socket.emit('newMessage', message)
    } else {
        document.getElementById("emailChat").classList.add('isInvalid')
    }
    return false;
}

