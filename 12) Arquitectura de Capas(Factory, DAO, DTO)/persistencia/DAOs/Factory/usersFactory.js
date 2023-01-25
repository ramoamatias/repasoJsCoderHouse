// const { UsersMemoryDAO } = require("../Memory/usersMemoryDAO.js");
const config = require("../../../config.js");
const { UsersMongoDAO } = require("../Mongo/usersMongoDAO.js");

let dao;

switch (config.FACTORY) {
  // se deben de agregar otros modelos de persistencia
  case "mongo":
    dao = UsersMongoDAO.getInstancia();
    break;

  default:
    dao = UsersMongoDAO.getInstancia();
    break;
}

module.exports = dao;
