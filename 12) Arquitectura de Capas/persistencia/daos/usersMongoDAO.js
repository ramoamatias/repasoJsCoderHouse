const { MongoClass } = require("../containers/MongoClass.js");
const { modelUsers } = require("../models/usersMongo.js");

class UsersMongoDAO extends MongoClass {
  constructor() {
    super(modelUsers);
  }
}

module.exports = {
  UsersMongoDAO,
};
