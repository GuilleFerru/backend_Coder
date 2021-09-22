import { optionsSQLite } from "./SQLite3";

export const createTable =  () => {
  console.log("holis");

  const knex = require("knex")(optionsSQLite);
  try {
    const tableName = "mensajes";
    if ( knex.schema.hasTable(tableName)) {
      return;
    } else {
      knex.schema.createTable(
        tableName,
        (table: {
          increments: (arg0: string) => void;
          string: (arg0: string) => void;
        }) => {
          table.increments("id");
          table.string("author");
          table.string("date");
          table.string("text");
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    knex.destroy();
  }
};
