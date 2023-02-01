const dotenv = require("dotenv");
const yargs = require("yargs");

dotenv.config();

const args = yargs(process.argv.slice(2))
  .alias({
    p: "port",
    m: "mode",
    f: "factory"
  })
  .default({
    p: 8080,
    m: "fork",
    f: "mongo"
  }).argv;

const config = {
  URLDBMONGO: process.env.URLDBMONGO,
  KEYSECRET: process.env.KEYSECRET,
  PORT: args.port,
  MODO: args.mode,
  FACTORY: args.factory
};

module.exports = config;
