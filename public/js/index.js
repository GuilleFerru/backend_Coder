const { fromEvent } = rxjs;
const socket = io();

fromEvent(window, 'load').subscribe(() => {
    const newForm = formTemplate({ inputInfo });
    document.getElementById('productsForm').innerHTML = newForm;
});

socket.on('loadProducts', (productos) => {
    const newTable = tableTemplate({
        productos: productos,
        productosKeys: productosKeys
    });
    document.getElementById('productsTable').innerHTML = newTable;
});

socket.on('messages', (messages) => {
    const newChat = chatTemplate({ messages })
    document.getElementById('productsChat').innerHTML = newChat;
});

const addMessage = () => {
    const author = document.getElementById("emailChat").value;
    const text = document.getElementById("chatText").value;
    const date = new Date().toLocaleString("es-AR", "DD-M-YYYY HH:MM:SS");
    console.log((/$^|.+@.+..+/).test(author))
    console.log(author)
    if((/$^|.+@.+..+/).test(author) && author !== ""){
        const message = {
            author: author,
            date: date,
            text: text,
        }
        socket.emit('newMessage', message)
    } else{
        document.getElementById("emailChat").classList.add('isInvalid')
    }
    return false;
}

