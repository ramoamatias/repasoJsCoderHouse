const mongoose = require("mongoose");

const nameCollection = "users";

const usersSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

const modelUsers = mongoose.model(nameCollection, usersSchema);

module.exports = {
  modelUsers
};
