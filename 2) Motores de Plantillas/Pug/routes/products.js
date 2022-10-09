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
    res.render("main.pug",{title:"View Products",type:"products",listProducts});
})

module.exports = router;