"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiProcess = require("../api/process");
var ControladorProcess = /** @class */ (function () {
    function ControladorProcess() {
        var _this = this;
        this.getInfo = function (_req, res) {
            var resultado = _this.apiProcess.getInfo();
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
        };
        this.getRandoms = function (req, res) {
            var cant = req.query.cant;
            _this.apiProcess.sendParent(cant || 100000000, function (randoms) {
                res.render("process", {
                    randoms: randoms,
                    btnAction: "/login",
                    info: false
                });
            });
        };
        this.apiProcess = new ApiProcess();
    }
    return ControladorProcess;
}());
module.exports = ControladorProcess;
