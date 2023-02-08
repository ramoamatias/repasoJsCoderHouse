const { HomeServices } = require("../services/homeServices.js");
const { ProductsServices } = require("../services/productsServices.js");

class HomeController {
  constructor(){
    this.homeServices = new HomeServices();
    this.productsServices = new ProductsServices();
  }
  home = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
  
    const array = await this.productsServices.getProducts();
  
    res.render("index.hbs", {
      isProducts: array.products.length > 0,
      arrayProducts: array.products,
      user: req.user.firstName,
      imgRute: req.user.avatar,
    });
  };
  
  routeNotFound = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.warn(data);
    res.redirect("/");
  };



}

module.exports = {
  HomeController,
};
