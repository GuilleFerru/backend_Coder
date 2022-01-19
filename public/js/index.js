const { fromEvent } = rxjs;
const socket = io();

let port = '';



socket.on('products', (productos, isAdmin) => {

    const cardProducts = cardsTemplate({
        isAdmin: isAdmin,
        productos: productos,
        inputInfo: inputInfo,
    })

    const filtros = filterProductoTemplate({ isAdmin })
    document.getElementById('filterProductos').innerHTML = filtros;

    if (isAdmin) {
        newForm = formTemplate({ inputInfo });
        document.getElementById('productsForm').innerHTML = newForm;

        const mockData = mockDataTemplate();
        document.getElementById('mockDataTable').innerHTML = mockData;
    }
    document.getElementById('productsCard').innerHTML = cardProducts;
});

socket.on('messages', async (normalizePost) => {

    const author = new normalizr.schema.Entity("author",
        undefined,
        {
            idAttribute: 'email',
        }
    );
    const post = new normalizr.schema.Entity("post", {
        author: author,
    });
    const chat = new normalizr.schema.Entity('chat', {
        authors: [author],
        posts: [post]
    })
    const denormalizePost = normalizr.denormalize(normalizePost.result, chat, normalizePost.entities);
    const messages = denormalizePost.posts;

    const normalizedLength = JSON.stringify(normalizePost).length;
    const denormalizedLength = JSON.stringify(denormalizePost).length;
    const compresion = `${Math.trunc((normalizedLength / denormalizedLength) * 100)}%`;

    const newChat = await chatNormalizaTemplate({ messages, compresion })

    document.getElementById('productsChat').innerHTML = newChat;
});

socket.on('carts', (cart) => {
    
    const order = generateOrder(cart);
    const orderTotalObject = order.pop();
    const orderTotal = orderTotalObject.orderTotal;

    const modalCart = modalCartTemplate({ order, orderTotal })
    document.getElementById('modalCart').innerHTML = modalCart;
});

socket.on('port', (puerto) => {
    port = puerto;
});

const getQtyRandom = () => {
    return document.getElementById('randomQty').value;
}

const generateRandoms = () => {
    const cant = getQtyRandom();
    // location.href = `http://localhost:80/randoms?cant=${cant}`
    location.href = `/process/randoms?cant=${cant}`
}



const getQtyMocks = () => {
    return document.getElementById('mocksQty').value;
}

const generateFakeProductos = () => {
    const cant = getQtyMocks();
    fetch(`http://localhost:${port}/productos/vista-test/?cant=${cant}`, {
        method: "GET",
    }).then(response => response.json()).then(fakeProductos => {
        if (fakeProductos.error) {
            const errorTable = tableTemplate({
                error: fakeProductos.error
            });
            document.getElementById('tableTemplate').innerHTML = errorTable;
        } else {
            const newTable = tableTemplate({
                productos: fakeProductos,
                productosKeys: ['Nombre', 'Precio', 'Imagen']
            });
            document.getElementById('tableTemplate').innerHTML = newTable;
        }
    });
}

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

const generateOrder = (cart) => {
    let orderTotal = 0;
    cart.map(obj => {
        obj['total'] = obj.quantity * obj.producto.price;
        orderTotal += obj['total']
    });
    cart.push({ orderTotal: orderTotal });
    return cart;
}

const saveCart = () => {
    fetch(`http://localhost:${port}/carrito/listar/`, {
        method: "GET",
    }).then(response => response.json()).then(cart => {
        const order = generateOrder(cart);
        if (order.length > 1) {
            fetch(`http://localhost:${port}/carrito/agregar/`, {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(res => res.json()).then(res => {
                alert(`Compra "${res.resultado}" finalizada, revise su celular.`);
                location.reload();
            }).catch(error => { })
        }
    });
}

const deleteCart = (id) => {
    const url = `http://localhost:${port}/carrito/borrar/${id}`
    fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(_ => { }).catch(error => console.log(error))
}


const showCart = () => {
    fetch(`http://localhost:${port}/carrito/listar/`, {
        method: "GET",
    }).then(response => response.json()).then(cart => {
        modalCartTemplate({ })
        const order = generateOrder(cart);
        const orderTotalObject = order.pop();
        const orderTotal = orderTotalObject.orderTotal
        const modalCart = modalCartTemplate({ order, orderTotal })
        
        document.getElementById('modalCart').innerHTML = modalCart;
    }).catch(error => { });
}

const addToCart = (id) => {
    const url = `http://localhost:${port}/carrito/agregar/${id}`;
    fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => {
            let cartAlert;
            if (res.status !== 200) {
                cartAlert = alertTemplate({
                    alert: 'alert-danger',
                    text: 'Producto Sin Stock',
                })
            }else{
                cartAlert = alertTemplate({
                    alert: 'alert-success',
                    text: 'Producto Agregado al Carrito',
                })
            }
            
            document.getElementById('alertContainer').innerHTML = cartAlert;
            // res.json();
        })
        .catch();
}

const addProduct = () => {
    fetch(`http://localhost:${port}/productos/agregar`, {
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
    const url = `http://localhost:${port}/productos/borrar/${id}`
    fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(_ => { })
        .catch(error => console.log(error))
}

const updateProduct = (id) => {
    const url = `http://localhost:${port}/productos/actualizar/${id}`
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(getInputValues()),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(_ => { })
        .catch(error => console.log(error))
}

const passIdProductToModal = (id) => {
    const url = `http://localhost:${port}/productos/listar/${id}`
    fetch(url, {
        method: "GET",
    }).then(response => response.json()).then(product => {
        inputInfo.map(inputValue => {
            inputValue['value'] = product[inputValue.tag];
        });
        const modalProduct = modalTemplate({
            inputInfo: inputInfo,
            productId: product._id,
            productCode: product.code
        })
        document.getElementById('modalForm').innerHTML = modalProduct;
    })
        .catch(error => console.log(error))
}


let filterBy = '';
const checkFilter = (a) => {
    filterBy = String(a.id);
}

const filterProductos = () => {
    let filter = [];
    if (filterBy === 'nombre') {
        const prducto = document.getElementById('filterName').value;
        filter.push(prducto)
    } else if (filterBy === 'codigo') {
        const prducto = document.getElementById('filterCode').value;
        filter.push(prducto)
    } if (filterBy === 'precio') {
        const min = document.getElementById('minPrice').value;
        const max = document.getElementById('maxPrice').value;
        filter.push(min, max);
    } else if (filterBy === 'stock') {
        const min = document.getElementById('minStock').value;
        const max = document.getElementById('maxStock').value;
        filter.push(min, max);
    };
    socket.emit('filterProducto', filter, filterBy);

}

const limpiarFiltro = () => {
    var elements = document.getElementsByClassName('filter-content collapse show');
    for (var i = 0; i < elements.length; i++) {
        const newLocal = 'show';
        elements[i].classList.remove(newLocal);
    }
    document.getElementById('filterName').value = '';
    document.getElementById('filterCode').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('minStock').value = '';
    document.getElementById('maxStock').value = '';

    socket.emit('getAllProductos');
}


const addMessage = () => {
    const email = document.getElementById("emailChat").value;
    const nombre = document.getElementById("nombreChat").value;
    const apellido = document.getElementById("apellidoChat").value;
    const edad = document.getElementById("edadChat").value;
    const alias = document.getElementById("aliasChat").value;
    const text = document.getElementById("chatText").value;
    const avatar = document.getElementById("avatarChat").value;

    if ((/$^|.+@.+..+/).test(email) && email !== "" && alias !== "") {
        const mensaje = {
            text: text,
            author: {
                email: email,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                alias: alias,
                avatar: avatar
            },
        }
        socket.emit('newMessage', mensaje)
    } else {
        document.getElementById("emailChat").classList.add('isInvalid');
        document.getElementById("aliasChat").classList.add('isInvalid');
    }
    return false;
}

