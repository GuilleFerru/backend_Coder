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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAPI = void 0;
var server_1 = require("./server");
var child_process_1 = require("child_process");
var os = __importStar(require("os"));
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
var processAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
    var argsv, args, memoria, memoAux, memoriaString, numCPUs, datos, childRandom, callbackReturn, sendParent;
    return __generator(this, function (_a) {
        argsv = process.argv;
        args = argsv.splice(2, argsv.length).join(" - ");
        memoria = Object.entries(process.memoryUsage());
        memoAux = memoria.map(function (memo) { return memo[0] + ": " + memo[1]; });
        memoriaString = memoAux.join("  -  ");
        numCPUs = os.cpus().length;
        datos = {
            argumentos: args,
            plataforma: process.platform,
            nodeVersion: process.version,
            memoriaUso: memoriaString,
            path: process.argv[1],
            pid: process.pid,
            carpeta: process.cwd(),
            numCPUs: numCPUs
        };
        server_1.app.get("/info", function (_, res) {
            //-------------------------
            //MODIFIFCAR SEGUN TEST
            //-------------------------
            // console.log(datos);
            //-------------------------
            res.render("process", {
                datos: datos,
                btnAction: "/home",
                info: true
            });
        });
        childRandom = (0, child_process_1.fork)("./ts/ranGenerator.ts");
        callbackReturn = {};
        sendParent = function (data, callback) {
            childRandom.send({ data: data });
            callbackReturn = callback;
        };
        childRandom.on('message', function (randoms) {
            callbackReturn(randoms);
        });
        server_1.app.get('/randoms', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var cant;
            return __generator(this, function (_a) {
                cant = req.query.cant;
                sendParent(cant || 100000000, function (randoms) {
                    res.render("process", {
                        randoms: randoms,
                        btnAction: "/home",
                        info: false
                    });
                });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.processAPI = processAPI;