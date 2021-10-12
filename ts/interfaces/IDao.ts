import { Cart } from "./ICart";
import { Producto } from "./IProducto"
import {Mensaje} from "./IMensaje"


export interface IDao {

  insertProducto(producto: Producto): void;

  
  getProductos(): Promise<Producto[]> | Producto[] ;
  getProductoById(id: string): Producto | undefined;
  updateProducto(id: string, producto: Producto): void;
  deleteProducto(id: string): void;

  insertOrder(order: Cart[]): void;
  insertProductToCarrito(producto: Producto): void;
  getCarrito(): Promise<Cart[]> | Cart[] ;
  getCarritoById(id: string): Cart | undefined;
  updateQtyInCarrito(carrito: Cart): void;
  deleteCarrito(id: string): void;

  insertMensajes(mensaje: Mensaje): void;
  getMensajes():Promise<Mensaje[]> | Mensaje[];

}
