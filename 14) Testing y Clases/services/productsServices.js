const { ProductsFactory } = require("../persistencia/DAOs/Factory/productsFactory.js");
const { ProductsRepository } = require("../persistencia/Repositories/productsRepositories.js");

const productsFactory = new ProductsFactory();

class ProductsServices {
  constructor() {
    this.productDao = new ProductsRepository(productsFactory.dao);
  }

  getProducts = async () => {
    return await this.productDao.getAllProducts();
  };
  
  save = async (obj) => {
    return await this.productDao.save(obj);
  };
}

module.exports = {
  ProductsServices
};
