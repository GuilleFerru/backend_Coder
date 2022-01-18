import { Cart } from "./ICart";
import { Producto } from "./IProducto"
import { Mensaje } from "./IMensaje"
import { Usuario } from "./IUsuario";


export interface IDao {

  // getSession(): Promise<any> | any;

  findUser(username: string): Promise<any[]>

  insertProducto(producto: Producto): void;
  filterProducto(filtro: string[], filterBy: string): Promise<Producto[]> | Producto[];
  getProductos(): Promise<Producto[]> | Producto[];
  getProductoById(id: string): Promise<Producto> | Producto | undefined;
  updateProducto(id: string, producto: Producto): void;
  deleteProducto(id: string): void;
  // deleteProducto(producto: Producto): void;

  insertOrder(order: Cart[]): any;
  insertProductToCarrito(producto: Producto): void;
  getCarrito(): Promise<Cart[]> | Cart[];
  getCarritoById(id: string): Cart | undefined;
  updateQtyInCarrito(carrito: Cart): void;
  deleteCarrito(id: string): void;
  

  getMensajeById(id: string): Mensaje | undefined;
  insertMensajes(mensaje: Mensaje): void;
  getMensajes(): Promise<Mensaje[]> | Mensaje[] | any;

  // getUsuario(usuario: string): Promise<boolean>;

}
