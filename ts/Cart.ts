import { Product } from "./Product";

interface Cart {
    id: number;
    timestamp: number;
    quantity: number;
    product?: Product;
}

export class CartLogic {
    private cart: Array<Cart>;
    private count: number;
    private timestamp: number;

    constructor() {
        this.count = 0;
        this.timestamp = 0;
        this.cart = new Array<Cart>();
    }

    getCart() {
        return this.cart;
    }

    getProductsInCart() {
        return this.cart;
    }

    getCartById(id: number) {
        return this.cart.find((element) => element.id === id);
    }

    addProductToCart(product: Product) {
        this.cart.push({
            id: this.count + 1,
            timestamp: Date.now(),
            quantity: 1,
            product,
        });
        this.count++;
        return this.cart;
    }

    updateQtyInCart(cart: Cart) {
        const newCart: Cart = {
            ...cart,
            quantity: cart.quantity + 1,
        };
        const index = this.cart.indexOf(cart);
        this.cart[index] = newCart;
    }

    deleteCart(cartToBeDelete: Cart) {
        const index = this.cart.indexOf(cartToBeDelete);
        this.cart.splice(index, 1);
        return cartToBeDelete;
    }
}