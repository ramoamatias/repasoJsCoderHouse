// const  { ProductsMemoryDAO } = require("../Memory/usersMemoryDAO.js");
const config = require("../../../config.js");
const { ProductsMongoDAO } = require("../Mongo/productsMongoDAO.js");

let dao;

switch (config.FACTORY) {
  // se deben de agregar otros modelos de persistencia
  case "mongo":
    dao = ProductsMongoDAO.getInstancia();
    break;

  default:
    dao = ProductsMongoDAO.getInstancia();
    break;
}

module.exports = dao;
