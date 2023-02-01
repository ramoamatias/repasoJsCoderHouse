const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const config = require("../../../config.js");
const { MongoClass } = require("../../containers/MongoClass");
const { modelProducts } = require("../../models/productsMongo.js");

class ProductsMongoDAO extends MongoClass {
  static instance;

  constructor() {
    super(modelProducts);
    this.instancia = mongoose.connect(config.URLDBMONGO);
  }

  randomProducts(cant) {
    const arrayProducts = [];
    for (let i = 1; i <= cant; i++) {
      arrayProducts.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(1, 2000, 2),
        urlPhoto: faker.image.food(640, 480, true),
      });
    }
    return arrayProducts;
  }

  static getInstancia() {
    if (!this.instancia) {
      this.instancia = new ProductsMongoDAO();
    }

    return this.instancia;
  }
}

module.exports = {
  ProductsMongoDAO,
};
