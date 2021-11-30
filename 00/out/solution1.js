"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution1 = void 0;
//import * as fs from 'fs';
var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, '../input/input1.txt'), 'utf-8');
// const input = fs.readFileSync('input/input1.txt','utf8');
var lines = input.split('\n');
var solution1 = function () {
    /*load file*/
    var valueList = lines
        .map(function (line) { return parseInt(line); });
    var greeting = "Hello TEST!";
    return greeting;
};
exports.solution1 = solution1;
//# sourceMappingURL=solution1.js.map