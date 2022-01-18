import { Producto } from "../../interfaces/IProducto";



export const insertUpdateProductoDTOForMemory = (producto: Producto | any, id: string): any => ({
    _id: id,
    fyh: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const productoDTOForMemory = (producto: Producto | any): any => ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const insertUpdateProductoDTOForFile = (producto: Producto | any, id: string): any => ({
    _id: id,
    fyh: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const productoDTOForFile = (producto: Producto | any): any => ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const insertUpdateProductoDTOForSQL = (producto: Producto | any): any => ({
    timestamp: Number(Date.now()),
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const productoDTOForSQL = (producto: Producto | any): any => ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const insertUpdateProductoDTOForMongo = (producto: Producto | any): any => ({
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});

export const productoDTOForMongo = (producto: Producto | any): any => ({
    _id: producto._id,
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});


export const insertUpdateProductoDTOForFirebase = (producto: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData> | any) => ({
    title: producto.title,
    description: producto.description,
    code: producto.code,
    thumbnail: producto.thumbnail,
    price: producto.price,
    stock: producto.stock,
});

export const productoDTOForFirebase = (producto: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData> | any): any => ({
    _id: String(producto.id),
    title: producto.data().title,
    description: producto.data().description,
    code: producto.data().code,
    thumbnail: producto.data().thumbnail,
    price: producto.data().price,
    stock: producto.data().stock
}

)


