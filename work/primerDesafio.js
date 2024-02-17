class ProductsManager{

    constructor (){
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
    }

    getProducts () {
        return this.products;
    }

    getProductById (id) {
        if(this.products.some(product => product.id === id)){
            return this.products.find(product => product.id === id);
        } else {
            console.error("Not found");
        }
    }
}

const products = new ProductsManager();

products.addProduct(
    "PALO VLACK EMULI PRO PLATA 22/33",
    "Este palo fue desarrollado con el objetivo de perfeccionar la arrastrada. Su tres características principales harán que este gesto técnico alcance su máximo nivel: Canaleta a los 200mm, curvatura  y mango oval anatómico. Es uno de los palos más rígidos de la línea gracias a su 95% de carbono y fue diseñado para jugadores profesionales y/o experimentados.",
    "$333.500",
    "https://www.prohockeyshop.com.ar/productos/palo-vlack-emuli-pro-plata-22-33/?pf=gs&variant=723924740&gad_source=1&gclid=CjwKCAiArLyuBhA7EiwA-qo80P6SX7Zo_7p2oxvnNkeEsg3bzhDvE4bvF4pH4xiRBOWmtKAykO_JcRoCNzMQAvD_BwE#product-gallery-1",
    "product_001",
    "15"
);

products.addProduct(
    "Palo Hockey Grays Ac5 Dynabow Micro Carbono 60% Color Negro",
    "El Palo de Hockey Grays AC5 Dynabow es una herramienta de alta calidad diseñada para jugadores senior que buscan mejorar su juego. Este palo, de color negro, es un producto de la reconocida marca Grays, conocida por su compromiso con la excelencia y la innovación en el mundo del hockey. El AC5 Dynabow está compuesto por un 60% de carbono, lo que le proporciona una resistencia y durabilidad excepcionales, permitiendo a los jugadores realizar golpes potentes y precisos. Este palo no es solo para jugadores de campo, sino que también es ideal para arqueros, gracias a su diseño y construcción. El material compuesto del palo asegura un rendimiento óptimo en cualquier tipo de campo, pero especialmente sobre hierba. Además, este modelo AC5 Dynabow, de origen asiático, cuenta con una curva Dynabow, que potencia el desarrollo de las destrezas y habilidades del jugador. En resumen, este palo de hockey Grays AC5 Dynabow es una inversión inteligente para cualquier jugador serio de hockey que busque mejorar su juego y rendimiento.",
    "281.600",
    "https://www.mercadolibre.com.ar/palo-hockey-grays-ac5-dynabow-micro-carbono-60-color-negro/p/MLA28732316?item_id=MLA1615378928&from=gshop&matt_tool=60803023&matt_word=&matt_source=google&matt_campaign_id=14242903088&matt_ad_group_id=125225550909&matt_match_type=&matt_network=g&matt_device=c&matt_creative=538641359510&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735113679&matt_product_id=MLA28732316-product&matt_product_partition_id=2267978675651&matt_target_id=aud-2014906607167:pla-2267978675651&cq_src=google_ads&cq_cmp=14242903088&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gclid=CjwKCAiArLyuBhA7EiwA-qo80MISewjZmbrPx7Vt2Z80qD90VxdAYQLbIwrPZzlQyTEBADmw51VOKhoCePkQAvD_BwE#&gid=1&pid=1",
    "product_002",
    "21"
)

console.log(products.getProducts());

console.log(products.getProductById(1));

console.log(products.getProductById(1));

console.log(products.getProductById(30));