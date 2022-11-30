const dotenv = require("dotenv");
const yargs = require("yargs");

dotenv.config();

const args = yargs(process.argv.slice(2))
  .alias({
    p: "port",
  })
  .default({
    p: 8080,
  }).argv;

const config = {
  URLDBMONGO: process.env.URLDBMONGO,
  KEYSECRET: process.env.KEYSECRET,
  PORT: args.port,
};

module.exports = config;
