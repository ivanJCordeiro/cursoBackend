import fs from "fs";

export class ProductsManager{

    constructor (){
        this.path = "./products.json"
        this.products = [];
        this.id = 1
    }


    async addProduct( title , description , price , thumbnail , code , stock ){

        if(!title || !description || !price || !thumbnail || !code || !stock) return console.error("Todos los campos son obligatorios");

        const existCode = 
            this.products.some(product =>
                product.code === code)

        if (existCode){
            console.error("Codigo en uso, por favor escribir otro");
            return
        }

        const addNewProduct = {
            id : this.id ++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        
        this.products.push (addNewProduct)
        console.log("Producto agregado : ", addNewProduct);

        await fs.promises.writeFile(this.path , JSON.stringify( this.products , null,"\t" ));
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
}
