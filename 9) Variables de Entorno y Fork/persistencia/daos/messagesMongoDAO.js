const { schema, normalize } = require("normalizr");
const { MongoClass } = require("../containers/MongoClass.js");
const { modelMessages } = require("../models/messageMongo.js");

class MessagesMongoDAO extends MongoClass {
  constructor() {
    super(modelMessages);
  }

  async getByNormalize() {
    const authorEntity = new schema.Entity(
      "author",
      {},
      { idAttribute: "email" }
    );

    const messageEntity = new schema.Entity(
      "message",
      {
        author: authorEntity,
      },
      { idAttribute: "_id" }
    );

    const messagesEntity = new schema.Entity("messages", {
      messages: [messageEntity],
    });

    const response = await this.getAllByProjection({
      _id: 1,
      author: 1,
      text: 1,
      time: 1,
    });

    let dataNueva = JSON.parse(JSON.stringify(response)),
      data = {
        id: "i999",
        messages: dataNueva,
      };
    return normalize(data, messagesEntity);
  }
}

module.exports = {
  MessagesMongoDAO,
};
