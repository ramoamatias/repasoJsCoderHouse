const mongoose = require("mongoose");
const config = require("../config.js");

function connectMongoDB() {
  const URL = config.URLDBMONGO;
  mongoose.connect(URL);
}   

module.exports = {
  connectMongoDB
}
