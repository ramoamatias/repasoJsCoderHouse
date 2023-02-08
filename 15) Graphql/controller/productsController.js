const { ProductsServices } = require("../services/productsServices.js");
const { HomeServices } = require("../services/homeServices.js");

class ProductsController {
  constructor() {
    this.homeServices = new HomeServices();
    this.productsServices = new ProductsServices();
  }

  getAllProducts = async () => {
    return await this.productsServices.getProducts();
  };

  getAllProductsGraphql = async () => {
    const response = await this.productsServices.getProducts();
    return response.products;
  };

  saveGraphql = async (obj) => {
    const response = await this.productsServices.save(obj);
    return response;
  };

  saveProduct = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    const { body } = req;
    console.log("--BODYYYYYY SAVE PRODUCT", body);
    // await this.productsServices.save(body);
    // res.redirect("/");

    // PAra realizar los test cambio la respuesta
    const response = await this.productsServices.save(body);
    console.log("Repsonseeeeee saveProducts", response);
    res.json(response);
  };
}
module.exports = {
  ProductsController,
};
