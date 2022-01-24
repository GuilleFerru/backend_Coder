import { Cart } from "../DAOs/interfaces/ICart";



export const insertOrdenDTOForMemory = (order: Array<Cart>, productos: any, id: string): any => ({
    _id: id,
    productos: productos,
    orderTotal: order[1].orderTotal
});

export const orderProductoAdminDTO = (productoInCarrito: Cart) => ({
    Producto: productoInCarrito.producto.title,
    Codigo: productoInCarrito.producto.code,
    Cantidad: productoInCarrito.quantity,
    'Stock restante': productoInCarrito.producto.stock,
    'Precio por unidad': `${productoInCarrito.producto.price} $`,
    'Precio total': `${productoInCarrito.total} $`
});


export const orderProductoClientDTO = (productoInCarrito: Cart) => ({
    Producto: productoInCarrito.producto.title,
    Cantidad: productoInCarrito.quantity,
    'Precio por unidad': `${productoInCarrito.producto.price} $`,
    'Precio total': `${productoInCarrito.total} $`
});


export const orderFinalDTO = (id: string, adminOrder: any, clientOrder: any, price: number): any => ({
    _id: id,
    fyh: new Date().toLocaleString(),
    orderTotal: `${price} $`,
    adminOrder: adminOrder,
    clientOrder: clientOrder,
});