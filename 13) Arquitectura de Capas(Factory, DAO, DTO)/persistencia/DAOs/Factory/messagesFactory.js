// const { MessagesMemoryDAO } = require("../Memory/messagesMemoryDAO.js");
const config = require("../../../config.js");
const { MessagesMongoDAO } = require("../Mongo/messagesMongoDAO.js");

let dao;

switch (config.FACTORY) {
  // se deben de agregar otros modelos de persistencia
  case "mongo":
    dao = MessagesMongoDAO.getInstancia();
    break;

  default:
    dao = MessagesMongoDAO.getInstancia();
    break;
}

module.exports = dao;
