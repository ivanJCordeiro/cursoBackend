import { error } from "console";
import fs from "fs";

export class ProductsManager{

    constructor (){
        this.path = "./src/data/products.json"
        this.products = [];
    }


    async addProduct(productData){

        const { title, description, price, thumbnail, code, stock, status = true, category } = productData;

        if(!title || !description || !price || !code || !stock || !category) return console.error("Todos los campos son obligatorios");

        const existCode = 
            this.products.some(product =>
                product.code === code)

        if (existCode){
            console.error("Codigo en uso, por favor escribir otro");
            return
        }

        const addNewProduct = {
            id : await this.getId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status, 
            category
        }
        
        let existingProducts = [];
        try{
            const readFile = await fs.promises.readFile(this.path)
            existingProducts = JSON.parse(readFile);
        } catch(error){
            console.error("Error al leer la lista de productos" , error);
            return;
        }

        existingProducts.push (addNewProduct)
        console.log("Producto agregado : ", addNewProduct);

        await fs.promises.writeFile(this.path , JSON.stringify( existingProducts , null,"\t" ));
    }

    async getProducts(){
        try{
            const prod = await fs.promises.readFile(this.path, "utf-8");

            return JSON.parse(prod);

        }catch (error){
            console.error(error);
            return [];
        }
    }

    async getProductById(id) {
        const prod = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(prod)
        const product = this.products.find((product) => product.id == id);
        if (!product) {
          throw new Error("Producto no encontrado.");
        }
        return product;
      }
    
    async updateProduct (id , product){
        const products = await this.getProducts();
        let productUpdated = {};

        for (let key in products){
            if(products[key].id === id){
                products[key].title = product.title ? product.title : products[key].title;
                products[key].description = product.description ? product.description : products[key].description;
                products[key].price = product.price ? product.price : products[key].price;
                products[key].thumbnail = product.thumbnail ? product.thumbnail : products[key].thumbnail;
                products[key].code = product.code ? product.code : products[key].code;
                products[key].stock = product.stock ? product.stock : products[key].stock
                products[key].status = product.status;
                products[key].category = product.category ? product.category : products[key].category;

                productUpdated = products[key];
            }
        }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products, null , "\t"));

            return productUpdated;
        }catch(error){
            console.error(error);
            return{
                message : "Error al actualizar el producto"
            }
        }
    }

    async deleteProduct (id){
        const products = await this.getProducts();
        const initialLength = products.length;

        const productsFilter = products.filter(prod => prod.id != id);

        const finalLength = productsFilter.length;

        try{
            if(initialLength == finalLength){
                throw new error (`No se pudo eliminar el producto ${id}`)
            }

            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null , "\t"));

            return `El producto ${id} fue eliminado exitosamente`;

        }catch(error){
            return error.message;
        }
    }

    async getId(){
        const prod = await this.getProducts();

        if( prod.length > 0 ){
            return parseInt(prod[prod.length - 1].id + 1)
        }

        return 1;
    }
}
