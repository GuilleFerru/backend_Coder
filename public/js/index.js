const { fromEvent } = rxjs;
const socket = io();

fromEvent(window, 'load').subscribe(() => {
    const navbar = navBarTemplate();
    document.getElementById('navbar').innerHTML = navbar;
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

socket.on('carts', (cart) => {
        let orderTotal = 0;
        cart.map(obj => {
            obj['total'] = obj.quantity * obj.product.price;
            orderTotal += obj['total']
        });  
        const modalCart = modalCartTemplate({ cart, orderTotal })
        document.getElementById('modalCart').innerHTML = modalCart;
});


socket.on('products', (productos, isAdmin) => {
    const cardProducts = cardsTemplate({
        isAdmin: isAdmin,
        productos: productos,
        inputInfo: inputInfo,
    })
    if (isAdmin) {
        const newForm = formTemplate({ inputInfo });
        document.getElementById('productsForm').innerHTML = newForm;
    }
    document.getElementById('productsCard').innerHTML = cardProducts;
});


const getInputValues = () => {
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
    return _data;
}

const cleanInputValues = () => {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('code').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
}

const saveCart = ()=>{
    fetch("http://localhost:8080/carrito/listar/", {
        method: "GET",
    }).then(response => response.json()).then(cart => {
        let orderTotal = 0;
        cart.map(obj => {
            obj['total'] = obj.quantity * obj.product.price;
            orderTotal += obj['total']
            
        });  
        cart.push({orderTotal: orderTotal})
    
        socket.emit('saveCart',cart);
    });
}

const deleteCart = (id) => {
    const url = `http://localhost:8080/carrito/borrar/${id}`
    fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}


const showCart = () => {
    fetch("http://localhost:8080/carrito/listar/", {
        method: "GET",
    }).then(response => response.json()).then(cart => {
        let orderTotal = 0;
        cart.map(obj => {
            obj['total'] = obj.quantity * obj.product.price;
            orderTotal += obj['total']
        });  
        const modalCart = modalCartTemplate({ cart, orderTotal })
        document.getElementById('modalCart').innerHTML = modalCart;
    });

}

const addToCart = (id) => {
    const url = `http://localhost:8080/carrito/agregar/${id}`;
    fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => {
            const cartAlert = alertTemplate({})
            document.getElementById('alertContainer').innerHTML = cartAlert;
            res.json();
        })
        .catch(error => console.log(error))
}

const addProduct = () => {
    fetch('http://localhost:8080/productos/agregar', {
        method: "POST",
        body: JSON.stringify(getInputValues()),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => {
            // console.log(res.json());
            cleanInputValues();
        })
        .catch(error => console.log(error))
}

const deleteProduct = (id) => {
    const url = `http://localhost:8080/productos/borrar/${id}`
    fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

const updateProduct = (id) => {
    const url = `http://localhost:8080/productos/actualizar/${id}`
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(getInputValues()),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(_ => { })
        .catch(error => console.log(error))
}

const passIdProductToModal = (id) => {
    
    const url = `http://localhost:8080/productos/listar/${id}`
    fetch(url, {
        method: "GET",
    }).then(response => response.json()).then(product => {
        inputInfo.map(inputValue => {
            console.log(inputValue.tag)
            inputValue['value'] = product[0][inputValue.tag];
        });
        
        const modalProduct = modalTemplate({
            inputInfo: inputInfo,
            productId: product.id,
            productCode: product.code
        })
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

