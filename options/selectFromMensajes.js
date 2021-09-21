const { options } = require("./SQLite3");
const knex = require("knex")(options);

knex.from("mensajes").select("*").then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
    throw error;
  }).finally(() => {
    knex.destroy();
  });
