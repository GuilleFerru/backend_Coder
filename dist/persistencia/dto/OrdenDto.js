"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderFinalDTO = exports.orderProductoClientDTO = exports.orderProductoAdminDTO = exports.insertOrdenDTOForMemory = void 0;
var insertOrdenDTOForMemory = function (order, productos, id) { return ({
    _id: id,
    productos: productos,
    orderTotal: order[1].orderTotal
}); };
exports.insertOrdenDTOForMemory = insertOrdenDTOForMemory;
var orderProductoAdminDTO = function (productoInCarrito) { return ({
    Producto: productoInCarrito.producto.title,
    Codigo: productoInCarrito.producto.code,
    Cantidad: productoInCarrito.quantity,
    'Stock restante': productoInCarrito.producto.stock,
    'Precio por unidad': productoInCarrito.producto.price + " $",
    'Precio total': productoInCarrito.total + " $"
}); };
exports.orderProductoAdminDTO = orderProductoAdminDTO;
var orderProductoClientDTO = function (productoInCarrito) { return ({
    Producto: productoInCarrito.producto.title,
    Cantidad: productoInCarrito.quantity,
    'Precio por unidad': productoInCarrito.producto.price + " $",
    'Precio total': productoInCarrito.total + " $"
}); };
exports.orderProductoClientDTO = orderProductoClientDTO;
// export const orderProcessedClientDTO = (productos: any): any => ({
//     productos: productos,
// });
var orderFinalDTO = function (id, adminOrder, clientOrder, price) { return ({
    _id: id,
    fyh: new Date().toLocaleString(),
    orderTotal: price + " $",
    adminOrder: adminOrder,
    clientOrder: clientOrder,
}); };
exports.orderFinalDTO = orderFinalDTO;
