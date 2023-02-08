class ProductsDTO {
  constructor(product) {
    this.id = product._id
    this.name = product.name;
    this.price = `$ ${product.price}`;
    this.urlPhoto = product.urlPhoto;
  }
}

module.exports = {
  ProductsDTO,
};
