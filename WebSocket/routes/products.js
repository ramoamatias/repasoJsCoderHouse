const {Router} = require("express")
const Contenedor = require("../../Contenedor");

let router = Router();
let file = new Contenedor("../src/files/products.txt");

router.post("/",(req,res)=> {
    const {body} = req;
    file.save(body);
    res.redirect("/");
});


module.exports = router;