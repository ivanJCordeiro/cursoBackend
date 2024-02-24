const fs = require("fs");

class ProductsManager{

    constructor (){
        this.path = "./work/products.json"
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
        this.id = 1
    }


    async addProduct( title , description , price , thumbnail , code , stock ){

        // const existCode = 
        //     this.products.some(product =>
        //         product.code === code)

        // if (existCode){
        //     console.error("Codigo en uso, por favor escribir otro");
        //     return
        // }

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

    async getProducts () {
        try {
        const readFile = await fs.promises.readFile(this.path , "utf-8");
        const productsObj = JSON.parse(readFile)
        return productsObj;
        }catch (error){
            console.error("Error al obtener productos" , error);
            return;
        }
    }

    async getProductById (id) {
        try {
            const productId = parseInt(id); 
            const product = this.products.find(product => product.id === productId);
            if (product) {
                return product;
            } else {
                console.error("Producto no encontrado");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener producto por ID", error);
            return null;
        }}

    async updateProduct (id, data){
        const findId = this.products.findIndex(product => product.id === id);
        if (findId === -1) return console.error("Not found");

        const updateProduct = {
                ...this.products[findId],
                ...data,
                id : this.products[findId].id
        };

        this.products[findId] = updateProduct

        await fs.promises.writeFile(this.path , JSON.stringify(this.products , null , "\t"));
        console.log("Producto actualizado : " , updateProduct);
    }

    async deleteProduct (id){

        const deleteForId = this.products.findIndex(product => product.id === id)
        if(deleteForId === -1) {
            console.error("Producto no encontrado");
            return
        };
        this.products.splice(deleteForId , 1)

        await fs.promises.writeFile(this.path , JSON.stringify(this.products, null, "\t"));
        console.log(`Producto ${id} eliminado correctamente`);
    }
}

const products = new ProductsManager();

async function addProductDetails(){
    
   await products.addProduct(
        "PALO VLACK EMULI PRO PLATA 22/33",
        "Este palo fue desarrollado con el objetivo de perfeccionar la arrastrada. Su tres características principales harán que este gesto técnico alcance su máximo nivel: Canaleta a los 200mm, curvatura  y mango oval anatómico. Es uno de los palos más rígidos de la línea gracias a su 95% de carbono y fue diseñado para jugadores profesionales y/o experimentados.",
        "$333.500",
        "sin imagen",
        "product_0011",
        "15"
    );
    
    await   products.addProduct(
        "Palo Hockey Grays Ac5 Dynabow Micro Carbono 60% Color Negro",
        "El Palo de Hockey Grays AC5 Dynabow es una herramienta de alta calidad diseñada para jugadores senior que buscan mejorar su juego. Este palo, de color negro, es un producto de la reconocida marca Grays, conocida por su compromiso con la excelencia y la innovación en el mundo del hockey..",
        "281.600",
        "sin imagen",
        "product_02",
        "21"
    )

}

async function executeOperations() {
    await addProductDetails();
    console.log(await products.getProducts());
    console.log(await products.getProductById(1));
    console.log(await products.getProductById(2));
}

executeOperations();
