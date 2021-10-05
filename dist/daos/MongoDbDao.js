"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDao = void 0;
var MongoDbDao = /** @class */ (function () {
    function MongoDbDao() {
        // TODO: Conectarse a la base
    }
    MongoDbDao.prototype.insertProducto = function (producto) {
        console.log("Insertando " + producto + " en MongoDbDao");
    };
    ;
    MongoDbDao.prototype.getProductos = function (producto) {
    };
    ;
    MongoDbDao.prototype.getProductoById = function (id) {
    };
    ;
    MongoDbDao.prototype.updateProducto = function (id) {
    };
    ;
    MongoDbDao.prototype.deleteProducto = function (id) {
    };
    ;
    return MongoDbDao;
}());
exports.MongoDbDao = MongoDbDao;
