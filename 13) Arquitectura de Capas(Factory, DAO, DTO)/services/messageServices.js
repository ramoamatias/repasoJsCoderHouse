const dao = require("../persistencia/DAOs/Factory/messagesFactory.js");
const {
  MessagesRepository,
} = require("../persistencia/Repositories/messagesRepositories.js");

const messageDao = new MessagesRepository(dao);

const getMessagesNormalize = async () => {
  return await messageDao.getByNormalize();
};

const saveMessage = async (message) => {
  return await messageDao.save(message);
};
module.exports = {
  getMessagesNormalize,
  saveMessage,
};
