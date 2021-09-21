const { options } = require("./productosMariaDB.js");
const knex = require("knex")(options);

const tableName = "productos";

(async () => {
    try {
        if (await knex.schema.hasTable(tableName)) {
            console.log("Tabla ya existe");
            return;
        } else {
            await knex.schema.createTable(tableName, (table) => {
                table.increments("id").primary();
                table.integer("timestamp").notNullable();
                table.string("title").notNullable();
                table.string("description").notNullable();
                table.string("code").notNullable();
                table.string("thumbnail").notNullable();
                table.float("price").notNullable();
                table.integer("stock").notNullable();
            })
        }
        console.log("Tabla creada");
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        knex.destroy();
    }
})()