const express = require("express");

const app = express();
const productsRouter = require("../routes/products");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/products", productsRouter);

app.set("views","./views");
app.set("view engine","pug");

app.get("/",(req,res)=> {
    res.render("main.pug",{title:"Enter Product",type:"form"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT} `);
    console.log("http://localhost:"+PORT);
})