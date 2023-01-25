const { ProductsDTO } = require("../DTOs/productsDTO.js");

class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async save(user) {
    const newProduct = await this.dao.save(user);
    const productDTO = new ProductsDTO(newProduct);
    return productDTO;
  }

  async getAllProducts() {
    const arrayProducts = await dbProducts.getAll();
    const array = {
      products: arrayProducts.map((document) => {
        return new ProductsDTO(document);
      }),
    };
    return array;
  }
}

module.exports = {
  ProductsRepository,
};
