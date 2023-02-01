const { getMessagesNormalize, saveMessage } = require("../services/messageServices.js");
const {getProducts} = require("../services/productsServices.js")


const emitProducts = async () => {
  return await getProducts();
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
