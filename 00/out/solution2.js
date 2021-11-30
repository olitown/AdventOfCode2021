"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution2 = void 0;
//import * as fs from 'fs';
var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.resolve(__dirname, '../input/input2.txt'), 'utf-8');
var lines = input.split('\n');
var solution2 = function () {
    var valueList = lines
        .map(function (line) { return parseInt(line); });
    var greeting = "Hello TEST Solution2!";
    return greeting;
};
exports.solution2 = solution2;
//# sourceMappingURL=solution2.js.map