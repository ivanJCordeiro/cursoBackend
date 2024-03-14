import { Router } from "express";
import {ProductsManager} from "../services/productsManager.js";
import { CartManager } from "../services/cartManager.js";

const router = Router();
const products = new ProductsManager("./src/data/products.json");
const carts = new CartManager("./src/data/carts.json")


router.get("/:cid" , async (req, res) =>{
    try{
        const cid = parseInt(req.params.cid);
        const filterCid = await carts.getCartId(cid);
        if(filterCid){
            res.json(filterCid)
        }
    }catch(error){
        res.status(400).send({error : "No existe el carrito"})
        return [];
    }
});

router.post("/", async (req, res) =>{
    try{
        await carts.writeCart();
        const addNewCart = await carts.writeNewCart();
        res.json(addNewCart);
    }catch(error){
        res.status(400).send({error : "No se pudo crear el carrito"})
        return [];
    }
    
})

router.post("/:cid/product/:pid", async (req, res) => {
try{
  let {cid, pid} = req.params;
  
  const product = await products.getProducts(pid);
  const productId = product.find(prod => prod.id === pid);
  const findCart = await carts.getCartId(cid);
  const cartId = findCart.find(cart => cart.id === cid);
    if(!productId || !cartId){
      return res.status(400).send({error : "Se necesitan todos los parametros"})
    }

    const cartUpdate = await carts.addProductToCart(cid, pid)
    res.status(201).send(cartUpdate);
} catch(error) {
    console.error(error);
    res.status(400).send({error : "Error en la carga de productos"})
}
  });

export default router;