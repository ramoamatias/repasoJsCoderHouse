const { faker } = require("@faker-js/faker");
const { MongoClass } = require("../containers/MongoClass.js");
const { modelProducts } = require("../models/productsMongo.js");

class ProductsMongoDAO extends MongoClass {
  constructor() {
    super(modelProducts);
  }

  randomProducts (cant) {
    const arrayProducts = [];
    for (let i = 1; i <=  cant; i++) {
      arrayProducts.push({
        name: faker.commerce.product(),
        price:faker.commerce.price(1, 2000, 2),
        urlPhoto:faker.image.food( 640, 480,true)
      });
    }
    return arrayProducts;
  }

}

module.exports = {
  ProductsMongoDAO,
};
