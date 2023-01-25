const { methodAndRoute, logger } = require("../services/homeServices.js");
const { getProducts } = require("../services/productsServices.js");

const home = async (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);

  const array = await getProducts();

  res.render("index.hbs", {
    isProducts: array.products.length > 0,
    arrayProducts: array.products,
    user: req.user.firstName,
    imgRute: req.user.avatar,
  });
};

const routeNotFound = async (req, res) => {
  const data = methodAndRoute(req);
  logger.warn(data);
  res.redirect("/");
};

module.exports = {
  home,
  routeNotFound
};
