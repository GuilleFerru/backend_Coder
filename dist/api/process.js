"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var child_process_1 = require("child_process");
var generateRandom = function () {
    return Math.floor(Math.random() * 1000 + 1);
};
var calcularRandoms = function (cant) {
    var randomObject = {};
    for (var i = 0; i < cant; i += 1) {
        var random = generateRandom();
        if (randomObject[random]) {
            randomObject[random]++;
        }
        else {
            randomObject[random] = 1;
        }
    }
    return randomObject;
};
process.on('message', function (randomQty) {
    process.send(__assign({}, calcularRandoms(randomQty.data)));
});
var argsv = process.argv;
var args = argsv.splice(2, argsv.length).join(" - ");
var memoria = Object.entries(process.memoryUsage());
var memoAux = memoria.map(function (memo) { return memo[0] + ": " + memo[1]; });
var memoriaString = memoAux.join("  -  ");
var numCPUs = os.cpus().length;
// const childRandom = fork("./ts/utils/ranGenerator.ts");
var childRandom = (0, child_process_1.fork)("./ranGenerator.js");
var callbackReturn = {};
childRandom.on('message', function (randoms) {
    callbackReturn(randoms);
});
var ApiLogin = /** @class */ (function () {
    function ApiLogin() {
        this.getInfo = function () {
            var datos = {
                argumentos: args,
                plataforma: process.platform,
                nodeVersion: process.version,
                memoriaUso: memoriaString,
                path: process.argv[1],
                pid: process.pid,
                carpeta: process.cwd(),
                numCPUs: numCPUs
            };
            return datos;
        };
        this.sendParent = function (data, callback) {
            childRandom.send({ data: data });
            callbackReturn = callback;
        };
    }
    return ApiLogin;
}());
module.exports = ApiLogin;
