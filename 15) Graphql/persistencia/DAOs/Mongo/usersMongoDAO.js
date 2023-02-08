const mongoose = require("mongoose");
const config = require("../../../config.js");
const { MongoClass } = require("../../containers/MongoClass.js");
const { modelUsers } = require("../../models/usersMongo.js");

class UsersMongoDAO extends MongoClass {
  static instance;

  constructor() {
    super(modelUsers);
    this.instancia = mongoose.connect(config.URLDBMONGO);
  }

  static getInstancia() {
    if (!this.instancia) {
      this.instancia = new UsersMongoDAO();
    }

    return this.instancia;
  }
}

module.exports = {
  UsersMongoDAO,
};
