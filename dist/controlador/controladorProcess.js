"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var negocioProcess = require("../negocio/negocioProcess");
module.exports = {
    getInfo: function (req, res) {
        var resultado = negocioProcess.getInfo();
        if (!resultado) {
            res.status(404).json({ error: "no se pudo cargar la info" });
        }
        else {
            res.render("process", {
                resultado: resultado,
                btnAction: "/login",
                info: true
            });
        }
    },
    getRandoms: function (req, res) {
        var cant = req.query.cant;
        negocioProcess.sendParent(cant || 100000000, function (randoms) {
            res.render("process", {
                randoms: randoms,
                btnAction: "/login",
                info: false
            });
        });
    }
};
