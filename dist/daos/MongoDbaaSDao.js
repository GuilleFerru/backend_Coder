"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbaaSDao = void 0;
var MongoDbaaSDao = /** @class */ (function () {
    function MongoDbaaSDao() {
        this.productos = new Array();
    }
    MongoDbaaSDao.prototype.insertProducto = function (producto) {
        console.log("Insertando " + producto + " en MongoDbaaSDao");
        this.productos.push(producto);
    };
    MongoDbaaSDao.prototype.getProductos = function (producto) {
    };
    ;
    MongoDbaaSDao.prototype.getProductoById = function (id) {
    };
    ;
    MongoDbaaSDao.prototype.updateProducto = function (id) {
    };
    ;
    MongoDbaaSDao.prototype.deleteProducto = function (id) {
    };
    ;
    return MongoDbaaSDao;
}());
exports.MongoDbaaSDao = MongoDbaaSDao;
