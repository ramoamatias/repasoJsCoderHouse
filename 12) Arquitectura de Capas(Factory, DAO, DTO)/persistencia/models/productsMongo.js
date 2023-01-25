const mongoose = require("mongoose");

const nameCollection = "products";

const productsSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  urlPhoto: { type: String, required: true },
});

const modelProducts = mongoose.model(nameCollection, productsSchema);

module.exports = {
  modelProducts,
};
