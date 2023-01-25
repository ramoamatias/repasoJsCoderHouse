const { getProducts, save } = require("../services/productsServices.js");
const { methodAndRoute, logger } = require("../services/homeServices.js");

const getAllProducts = async () => {
  return getProducts();
};

const saveProduct = async (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  const { body } = req;
  await save(body);
  res.redirect("/");
};

module.exports = { getAllProducts, saveProduct };
