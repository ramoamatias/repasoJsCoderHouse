const { Router } = require("express");
const { ProductsController } = require("../controller/productsController.js");

let productsRouter = Router();

class ProductsRouter {
  constructor() {
    this.productsController = new ProductsController();
  }

  init() {
    productsRouter.post("/", this.productsController.saveProduct);
    return productsRouter;
  }
}
module.exports = {
  ProductsRouter,
};
