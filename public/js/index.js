const {fromEvent } = rxjs;
const socket = io();

fromEvent(window, 'load').subscribe(() => {
    const newForm = formTemplate({ inputInfo });
    document.getElementById('productsForm').innerHTML = newForm;
})

socket.on('cargarProductos', (productos) => {
    const newTable = tableTemplate({
        productos: productos,
        productosKeys: productosKeys
    });
    document.getElementById('productsTable').innerHTML = newTable;
});


(() => {
    window.addEventListener('load', function () {
        const forms = document.getElementsByClassName('needs-validation');
        const validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();