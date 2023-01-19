const {
  ProductsMongoDAO,
} = require("../persistencia/daos/productsMongoDAO.js");
const dbProducts = new ProductsMongoDAO();

const getProducts = async () => {
  const arrayProducts = await dbProducts.getAll();
  const array = {
    products: arrayProducts.map((document) => {
      return {
        name: document.name,
        price: document.price,
        urlPhoto: document.urlPhoto,
      };
    }),
  };

  return array;
};

const save = async (obj) => {
  return await dbProducts.save(obj);
};

module.exports = {
  getProducts,
  save,
};
