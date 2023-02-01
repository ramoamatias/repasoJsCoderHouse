const { getMessagesNormalize,saveMessage} = require("../services/messageServices.js");
const { ProductsServices } = require("../services/productsServices.js")

const productsServices = new ProductsServices();

const emitProducts = async () => {
  return await productsServices.getProducts();
};

const messageNormalize = async()=>{
  return await getMessagesNormalize()
}

const save = async (message)=> {
  return await saveMessage(message)
}

module.exports = {
  emitProducts,
  messageNormalize,
  save
};
