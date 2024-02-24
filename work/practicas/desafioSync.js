const fs = require("fs");

class ProductsManager{

    constructor (){
        this.path = "./work/practicas/desafioSync.txt"
        this.products = []
        this.id = 1
    }

    addProduct( title , description , price , thumbnail , code , stock ){

        if (!title || !description || !price || !thumbnail || !code || !stock ){
            console.warn("Todos los campos son obligatorios");
        }

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

        fs.writeFileSync(this.path , JSON.stringify( this.products , null , "\t"))
    }

    getProducts () {
        if(fs.existsSync(this.path)){
            const contenido = fs.readFileSync(this.path , "utf-8");
            return contenido;
        }
    }

    getProductById (id) {
        try {
            const read = fs.readFileSync(this.path, "utf-8")
            const products = JSON.parse(read)
            const found = products.some(product => product.id === id)
            if(found){
                return products.find(product => product.id === id);
            } else {
                return null;
            }
        } catch (error){
            console.error("Id no encontrado" , error);
            return null
        }
    }

    updateProduct (id , data){
        try{
            const read = fs.readFileSync(this.path , "utf-8");
            const products = JSON.parse(read);

            const index = products.findIndex(prod => prod.id === id);

            if(index != -1){

            const updateProd = {
                ...products[index],
                ...data,
                id: id
            }
        
            products[index] = updateProd

            fs.writeFileSync(this.path , JSON.stringify(products, null , "\t"), "utf-8");

            console.log("Producto modificado con exito", updateProd);
            } else {
                console.error("No se encontro el ID");
            }
        }catch(error){
            console.error("No se pudo modificar el objeto", error);
        }
    };

    deleteProduct (id){
        const read = fs.readFileSync(this.path , "utf-8");
        const products = JSON.parse(read);

        const deleteForId = products.findIndex(product => product.id === id)
            if(deleteForId === -1){
                console.error("Not found");
                return
            };
         products.splice(deleteForId , 1);
        try{
         fs.writeFileSync(this.path , JSON.stringify(products , null , "\t"));    
         console.log("producto ", `${id}` ,"eliminado");
        }catch(error){
            console.error("No se puedo eliminar el producto" , error);
        }
    }
}
const products = new ProductsManager();


// console.log(products.getProducts());
// console.log(products.getProductById(2));
// console.log(products.updateProduct(2 , {price : "300.000"}));
// console.log(products.deleteProduct(2));