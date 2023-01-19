const {
  MessagesMongoDAO,
} = require("../persistencia/daos/messagesMongoDAO.js");
const dbMessage = new MessagesMongoDAO();

const getMessagesNormalize = async () => {
  return await dbMessage.getByNormalize();
};

const saveMessage = async (message) => {
  return await dbMessage.save(message);
};
module.exports = {
  getMessagesNormalize,
  saveMessage,
};
