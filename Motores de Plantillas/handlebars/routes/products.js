const {Router} = require("express")
const Contenedor = require("../../../Contenedor");

let router = Router();
let listProducts = [];
let file = new Contenedor("./productos.txt");

router.post("/",(req,res)=> {
    const {body} = req;
    file.save(body);
    res.redirect("/");
});

router.get("/",async (req,res)=> {
    await file.getAll().then(res => listProducts = res);
    let isEmpty = listProducts.length === 0;
    res.render("viewProducts.hbs",{title:"View Products",listProducts,isEmpty});
})

module.exports = router;