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
var calcularRandoms = function (cant) {
    var generateRandom = function () {
        return Math.floor(Math.random() * 1000 + 1);
    };
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
var process = require('process');
process.on('message', function (randomQty) {
    process.send(__assign({}, calcularRandoms(randomQty.data)));
});
