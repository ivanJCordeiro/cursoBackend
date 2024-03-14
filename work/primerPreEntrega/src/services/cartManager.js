import { error } from "console";
import fs from "fs";

export class CartManager{

    constructor(filePath){
        this.file = filePath;
        this.carts = [];
        this.readCart();
    }

    //lectura del cart.json
    async readCart(){
        try{
        const readFile = await fs.promises.readFile(this.file , "utf-8" );
        this.carts = JSON.parse(readFile);
        this.nextId =this.carts.length > 0 ? Math.max(...this.carts.map((p) => p.id)) + 1 : 1;
    } catch(e){
        console.error(`Error en la lectura del archivo: ${e.message}`);
        this.carts = [];
    }}
    
    //escritura de carrito
    async writeCart(){
       await fs.promises.writeFile (this.file ,JSON.stringify(this.carts, null , "\t"))
    }
    
    //busqueda de id del carrito
    async getCartId(id){
        const cartFilter = this.carts.find(cart => cart.id === id);
        return cartFilter;
    }
    
    //escritura de un nuevo carrito
    async writeNewCart(){
        await this.readCart();
        const newCart ={
            id: this.nextId,
            products: []
        }
    
        this.carts.push(newCart);
        await this.writeCart();
        return newCart;
    }


    //agregar un producto al carrito
    async addProductToCart (cartId, productDetail , quantity = 1){
        await this.readCart();

        const cartIndex = await this.getCartId(cartId);

        if (cartIndex === -1 ){
            throw new error ("carrito no encontrado")
        }

        const cart = this.carts.find(cart => cart.id === cartId)

        if(!cart){
            throw new error ("carrito no encontrado")
        }

        const productIndex = await cart.products.findIndex(prod => prod.id === productDetail.id);

        if(productIndex !== -1){
            cart.products[productIndex].quantity += quantity
        } else {
            cart.products.push({ idProduct: productDetail.id, quantity} )
        }

        await this.writeCart();
        return cart;
    }
}
const cartss = new CartManager()

console.log(await cartss.getCartId(2));