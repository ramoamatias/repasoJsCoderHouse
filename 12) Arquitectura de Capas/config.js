const dotenv = require("dotenv");
const yargs = require("yargs");

dotenv.config();

const args = yargs(process.argv.slice(2))
  .alias({
    p: "port",
    m: "mode",
  })
  .default({
    p: 8080,
    m: "fork",
  }).argv;

const config = {
  URLDBMONGO: process.env.URLDBMONGO,
  KEYSECRET: process.env.KEYSECRET,
  PORT: args.port,
  MODO: args.mode,
};

module.exports = config;
