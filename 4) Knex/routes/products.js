const {Router} = require("express")
const Container = require("../src/js/ContenedorKnex.js");
const {config} = require("../db/dbConfig.js");

let router = Router();
let dbProducts = new Container(config,"products");

router.post("/",(req,res)=> {
    const {body} = req;
    dbProducts.save(body);
    res.redirect("/");
});


module.exports = router;