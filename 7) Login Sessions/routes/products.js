const {Router} = require("express");
const { ProductsMongoDAO } = require("../persistencia/daos/productsMongoDAO.js");

let router = Router();
const dbProducts = new ProductsMongoDAO();

router.post("/",(req,res)=> {
    const {body} = req;
    dbProducts.save(body);
    res.redirect("/");
});


module.exports = router;