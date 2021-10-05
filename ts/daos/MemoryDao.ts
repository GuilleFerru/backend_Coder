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
    // console.log(order[0].producto,'en dao');
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
