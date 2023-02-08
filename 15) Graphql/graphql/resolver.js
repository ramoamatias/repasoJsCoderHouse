const { InfoController } = require("../controller/infoController.js");
const { ProductsController } = require("../controller/productsController.js");

const infoController = new InfoController();
const productsController = new ProductsController();

const resolvers = {
  Query: {
    getInfo: async () => {
      console.log("GETINFO");
      const response = await infoController.getInfoGraphql();
      console.log("GETINFOOOOOOOOOOOoo", response);
      return response;
    },
    getAllproducts: async () => {
      const response = await productsController.getAllProducts();
      return response;
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const { name, price, urlPhoto } = input;
      const response = await productsController.saveGraphql({
        name,
        price,
        urlPhoto,
      });
      return response;
    },
  },
};

module.exports = {
  resolvers,
};
