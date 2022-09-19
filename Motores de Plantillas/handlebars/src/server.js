const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const productsRouter = require("../routes/products");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/products", productsRouter);


app.engine("hbs",hbs.engine({
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "indexForm.hbs"
}));

app.set("views","./views");
app.set("view engine","hbs");

app.get("/",(req,res)=> {
    res.render("enterProducts.hbs",{title:"Enter Product"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT} `);
    console.log("http://localhost:"+PORT);
})