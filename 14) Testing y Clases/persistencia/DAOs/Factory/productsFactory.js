// const  { ProductsMemoryDAO } = require("../Memory/usersMemoryDAO.js");
const config = require("../../../config.js");
const { ProductsMongoDAO } = require("../Mongo/productsMongoDAO.js");

class ProductsFactory {
  constructor() {
    switch (config.FACTORY) {
      // se deben de agregar otros modelos de persistencia
      case "mongo":
        this.dao = ProductsMongoDAO.getInstancia();
        break;

      default:
        this.dao = ProductsMongoDAO.getInstancia();
        break;
    }

  }
}
module.exports = { ProductsFactory };
