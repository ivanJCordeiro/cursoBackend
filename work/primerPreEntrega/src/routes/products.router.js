import { Router } from "express";
import {ProductsManager} from "../services/productsManager.js";

const router = Router();

const products = new ProductsManager ("./src/data/products.json");

router.get("/", async (req , res) => {
    try{
        const {limit} = req.query;

        let allProducts = await products.getProducts();
        
        if(limit){
            allProducts = allProducts.slice(0 , limit);
        }
    
        res.send(allProducts);
    
    }catch (error){
        console.log(error);

        return [];
    }});

router.get("/:pid" , async (req, res ) =>{
    try{
        const pid = parseInt(req.params.pid);
        const prod = await products.getProducts();
        const idFind = prod.find(prod => prod.id === pid);

        if(idFind) return res.send(idFind);
    } catch (error){
        console.log(error, "No se encontro el producto");

        return;
}});

router.post("/", async (req , res) => {

    const resp = await products.addProduct(req.body);

    res.status(201).send(resp);
});

router.put("/:pid" , async (req, res) =>{

    const pid = parseInt(req.params.pid);

    res.send(await products.updateProduct(pid , req.body));
});

router.delete("/:pid" , async (req, res) =>{

    const pid= parseInt(req.params.pid);

    res.send(await products.deleteProduct(pid));
});

export default router;