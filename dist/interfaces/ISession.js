"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var Session = /** @class */ (function () {
    function Session() {
        this.nombre = '';
        this.email = '';
        this.phone = '';
    }
    Session.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Session.prototype.setEmail = function (email) {
        this.email = email;
    };
    Session.prototype.setPhone = function (phone) {
        this.phone = phone;
    };
    Session.prototype.getNombre = function () {
        return this.nombre;
    };
    Session.prototype.getEmail = function () {
        return this.email;
    };
    Session.prototype.getPhone = function () {
        return this.phone;
    };
    return Session;
}());
exports.Session = Session;
