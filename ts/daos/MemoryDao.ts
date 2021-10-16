import { IDao } from "../interfaces/IDao";
import { Producto } from "../interfaces/IProducto";
import { Cart } from "../interfaces/ICart";
import { Order } from "../interfaces/IOrder";
import { Mensaje } from "../interfaces/IMensaje";

export class MemoryDao implements IDao {
  productos: Array<Producto>;
  carrito: Array<Cart>;
  order: Array<Cart>;
  mensajes: Array<Mensaje>
  countProducto: number;
  countCarrito: number;
  countOrder: number;


  constructor() {
    this.productos = new Array<Producto>();
    this.carrito = new Array<Cart>();
    this.order = new Array<Cart>();
    this.mensajes = new Array<Mensaje>();
    this.countProducto = 1;
    this.countCarrito = 1;
    this.countOrder = 1;
  }

  filterProducto(filtro: string[], filterBy: string): Array<Producto> {
    const productos: Array<Producto> = [];
    if (filterBy === 'nombre') {
      const filtroCapitalized = filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1);
      this.productos.forEach((producto: Producto) => {
        if (producto.title === filtro[0] || producto.title === filtroCapitalized) {
          productos.push(producto);
        }
      })
    } else if (filterBy === 'codigo') {
      this.productos.forEach((producto: Producto) => {
        if (producto.code === filtro[0]) {
          productos.push(producto);
        }
      })
    } else if (filterBy === 'precio') {
      this.productos.forEach((producto: Producto | any) => {
        if ((Number(producto.price) >= Number(filtro[0])) && (Number(producto.price) <= Number(filtro[1]))) {
          productos.push(producto);
        }
      })
    } else if (filterBy === 'stock') {
      this.productos.forEach((producto: Producto | any) => {
        if ((Number(producto.stock) >= Number(filtro[0])) && (Number(producto.stock) <= Number(filtro[1]))) {
          productos.push(producto);
        }
      })
    }
    return productos
  }




  insertProducto(producto: Producto): void {
    producto._id = String(this.countProducto);
    this.productos.push(producto);
    console.log(this.productos);

    this.countProducto++;
  }

  getProductos(): Array<Producto> {
    return this.productos
  };

  getProductoById(id: string): Producto | undefined {
    return this.productos.find((element) => element._id === id)
  };

  updateProducto(id: string, producto: Producto): void {
    const productToBeUpdate: any = this.getProductoById(id);
    this.productos.map((thisProduct) => {
      if (thisProduct._id === productToBeUpdate._id) {
        const index = this.productos.indexOf(thisProduct);
        this.productos[index] = { ...producto, _id: id };
      }
    })
  };

  deleteProducto(id: string): void {
    const productoToBeDelete: any = this.getProductoById(id);
    const index = this.productos.indexOf(productoToBeDelete);
    this.productos.splice(index, 1);
  };

  insertOrder(order: Array<Cart>): void {

    const newOrder: Order = new Order(
      String(this.countOrder),
      Date.now(),
      order
    );
    this.carrito = [];
    console.log(newOrder);
    this.countOrder++;
  }

  insertProductToCarrito(producto: Producto): void {
    const _id = String(this.countCarrito);
    this.carrito.push({
      _id: _id,
      timestamp: Date.now(),
      quantity: 1,
      producto,
    });
    this.countCarrito++;
  }

  getCarrito(): Array<Cart> {
    return this.carrito;
  }

  getCarritoById(id: string): Cart | undefined {
    return this.carrito.find((element) => element._id === id);
  }

  updateQtyInCarrito(carrito: Cart): void {
    const newCarrito: Cart = {
      ...carrito,
      quantity: carrito.quantity + 1,
    };
    const index = this.carrito.indexOf(carrito);
    this.carrito[index] = newCarrito;
  }

  deleteCarrito(id: string): void {
    const productoToBeDelete: any = this.getCarritoById(id);
    const index = this.carrito.indexOf(productoToBeDelete);
    this.carrito.splice(index, 1);
  }

  getMensajes(): Array<Mensaje> {
    return this.mensajes;
  }

  insertMensajes(mensaje: Mensaje): void {
    this.mensajes.push(mensaje);
  }


}
