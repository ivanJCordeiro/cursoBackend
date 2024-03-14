import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//endpoints
app.use("/api/products" , productsRouter);
app.use("/api/carts" , cartRouter);

//port
const PORT = 8080;
app.listen(PORT , () =>{
    console.log(`Listening on port http://localhost:${PORT}/`);
});