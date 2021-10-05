import { Cart } from "./ICart";
import { Producto } from "./IProducto"
import {Mensaje} from "./IMensaje"

export interface IDao {

  insertProducto(producto: Producto): void;
  getProductos(): Array<Producto>;
  getProductoById(id: string): Producto | undefined;
  updateProducto(id: string, producto: Producto): void;
  deleteProducto(id: string): void;

  insertOrder(order: Array<Cart>): void;
  insertProductToCarrito(producto: Producto): void;
  getCarrito(): Array<Cart>;
  getCarritoById(id: string): Cart | undefined;
  // getProductoById(id: string): Producto | undefined;
  updateQtyInCarrito(carrito: Cart): void;
  deleteCarrito(id: string): void;

  insertMensajes(mensaje: Mensaje): void;
  getMensajes():Array<Mensaje>;

}
