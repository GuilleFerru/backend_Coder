import * as fs from "fs";

export const saveCarrito = (cart: Array<string>) => {
    try {
      fs.writeFileSync("./cart.txt", JSON.stringify(cart, null, "\t"));
    } catch (error) {
      console.log("Hubo un error");
    }
  };
