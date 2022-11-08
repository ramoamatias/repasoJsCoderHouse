const mongoose = require("mongoose");

function connectMongoDB() {
  const URL = "mongodb+srv://matiasramoa:coderhouse@coderhouse.ocw4cfm.mongodb.net/test";
  mongoose.connect(URL);
}   

module.exports = {
  connectMongoDB
}
