"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = void 0;
var SQLite3_1 = require("./SQLite3");
var createTable = function () {
    console.log("holis");
    var knex = require("knex")(SQLite3_1.optionsSQLite);
    try {
        var tableName = "mensajes";
        if (knex.schema.hasTable(tableName)) {
            return;
        }
        else {
            knex.schema.createTable(tableName, function (table) {
                table.increments("id");
                table.string("author");
                table.string("date");
                table.string("text");
            });
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        knex.destroy();
    }
};
exports.createTable = createTable;
