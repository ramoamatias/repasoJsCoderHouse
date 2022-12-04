const mongoose = require("mongoose");

const nameCollection = "message";

const productsSchema = mongoose.Schema({
  author: {
    email: { type: String, required: true }, //mail from user
    firstName: { type: String, required: true }, //firstName from user
    lastName: { type: String, required: true }, //lastName from user
    age: { type: Number, required: true }, //age from user
    alias: { type: String, required: true }, //alias from user
    avatar: { type: String, required: true }, //avatar from user
  },
  text: { type: String, required: true }, //message from user
  time : { type: String, required: true } //Time send message
});

const modelMessages = mongoose.model(nameCollection, productsSchema);

module.exports = {
  modelMessages,
};
