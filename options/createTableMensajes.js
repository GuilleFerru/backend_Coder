const { options } = require("./SQLite3");
const knex = require("knex")(options);


const tableName = "mensajes";

(async () => {
  try {
    if (await knex.schema.hasTable(tableName)) {
      console.log("Tabla ya existe");
      return;
    } else {
      await knex.schema.createTable(tableName, (table) => {
        table.increments("id");
        table.string("author");
        table.string("date");
        table.string("text");
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





