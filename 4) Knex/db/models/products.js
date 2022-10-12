const knex = require("knex");
const {configMySQL} = require("../dbConfig.js");

const db = knex(configMySQL);
(async () => {
    try {
        const isExist = await db.schema.hasTable("products");
        if (!isExist) {
            await db.schema.createTable("products", table => {
                table.increments("id").primary();
                table.string("name").notNullable();
                table.integer("price").notNullable().checkPositive();
                table.string("urlPhoto").notNullable();
            });
            console.log("Products table created successfully");
        } 
    } catch (error) {
        console.log(error);
    }
})();