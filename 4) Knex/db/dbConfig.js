const knex = require("knex");

// // Conexion SQLite3
const config = {
  client: 'sqlite3', //o 'better-sqlite3'
  connection: {
    filename: "../db/database/ecommerce.sqlite"
  }
}

const db = knex(config);

module.exports = {config , db};