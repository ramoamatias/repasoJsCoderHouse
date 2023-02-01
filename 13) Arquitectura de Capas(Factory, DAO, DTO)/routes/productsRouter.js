const { Router } = require("express");
const { saveProduct } = require("../controller/productsController.js");

let router = Router();

router.post("/", saveProduct);

module.exports = {
  productsRouter: router,
};
