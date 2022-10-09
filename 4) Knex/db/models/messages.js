const { db } = require("../dbConfig.js");

(async () => {
    try {
        const isExist = await db.schema.hasTable("messages");
        if (!isExist) {
            await db.schema.createTable("messages", table => {
                table.increments("id").primary();
                table.string("user").notNullable();
                table.string("message").notNullable();
                table.dateTime("time").notNullable();
            });
            console.log("Message table created successfully");
        } 
    } catch (error) {
        console.log(error);
    }
})();