const { Router } = require("express");
const {
  ProductsMongoDAO,
} = require("../persistencia/daos/productsMongoDAO.js");
const logger = require("../src/js/logger.js");
const { methodAndRoute } = require("../src/js/functions.js");

let router = Router();
const dbProducts = new ProductsMongoDAO();

router.post("/", (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  const { body } = req;
  dbProducts.save(body);
  res.redirect("/");
});

module.exports = router;
