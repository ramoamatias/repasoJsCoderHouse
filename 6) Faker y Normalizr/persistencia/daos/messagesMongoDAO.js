const { schema, normalize } = require("normalizr");
const {MongoClass} = require("../containers/MongoClass.js");
const { modelMessages } = require("../models/messageMongo.js");
const {inspect} = require("util");

class MessagesMongoDAO extends MongoClass {
    constructor(){
        super(modelMessages)
    }

    async getByNormalize() {
        const authorEntity = new schema.Entity("author",{},{idAttribute:"id"});
        const messageEntity = new schema.Entity("message",{
            author: authorEntity,
        },{idAttribute:"_id"});

        const messagesEntity = new schema.Entity("messages", {
            post:[messageEntity]
        })

        const messageData = await this.getAll();
        console.log(messageData);
        const chatResponse = {
            id:1,
            post: [...messageData]
        }
        console.log(chatResponse);

  const empresaNormalized = normalize(chatResponse,messagesEntity);
  console.log(empresaNormalized);
//   // let longitudEmpresa = JSON.stringify(mensajes).length,
//   //    longitudEmpresaNormalized = JSON.stringify(empresaNormalized).length ;
//   // console.log("Data original",longitudEmpresa);
//   // console.log("Data Normalizada",longitudEmpresaNormalized);
console.log(inspect(empresaNormalized,false,12,true)); 
//   res.json(empresaNormalized);
    }
}

module.exports = {
    MessagesMongoDAO
}