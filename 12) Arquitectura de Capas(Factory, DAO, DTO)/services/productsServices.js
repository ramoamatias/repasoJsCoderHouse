const dao = require("../persistencia/DAOs/Factory/productsFactory.js");
const {
  ProductsRepository,
} = require("../persistencia/Repositories/productsRepositories.js");

const productDao = new ProductsRepository(dao);

const getProducts = async () => {
  return await productDao.getAllProducts();
};

const save = async (obj) => {
  return await productDao.save(obj);
};

module.exports = {
  getProducts,
  save,
};
