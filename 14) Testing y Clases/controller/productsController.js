const { ProductsServices } = require("../services/productsServices.js");
const { HomeServices } = require("../services/homeServices.js");

class ProductsController {
  constructor() {
    this.homeServices = new HomeServices();
    this.productsServices = new ProductsServices();
  }

  getAllProducts = async () => {
    return this.productsServices.getProducts();
  };

  saveProduct = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    const { body } = req;
    // await this.productsServices.save(body);
    // res.redirect("/");

    // PAra realizar los test cambio la respuesta
    const response = await this.productsServices.save(body);
    res.json(response);
  };
}
module.exports = {
  ProductsController,
};
