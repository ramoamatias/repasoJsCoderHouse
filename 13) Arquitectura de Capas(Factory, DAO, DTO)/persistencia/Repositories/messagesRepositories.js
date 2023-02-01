const { MessageDTO } = require("../DTOs/messageDTO.js");

class MessagesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async save(message) {
    const newMessage = await this.dao.save(message);
    const messageDTO = new MessageDTO(newMessage);
    return messageDTO;
  }

  async getByNormalize() {
    return await this.dao.getByNormalize();
  }
}

module.exports = {
    MessagesRepository
}