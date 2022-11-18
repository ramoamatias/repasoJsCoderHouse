const mongoose = require("mongoose");

const nameCollection = "users";

const usersSchema = mongoose.Schema({
  email: { type: String, required: true }, //mail from user
  firstName: { type: String, required: true }, //firstName from user
  lastName: { type: String, required: true }, //lastName from user
  age: { type: Number, required: true }, //age from user
  alias: { type: String, required: true }, //alias from user
  avatar: { type: String, required: true }, //avatar from user
  password: { type: String, required: true }, //passwor from user
});

const modelUsers = mongoose.model(nameCollection, usersSchema);

module.exports = {
  modelUsers,
};
