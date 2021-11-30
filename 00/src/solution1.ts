const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, '../input/input1.txt'),'utf-8');
const lines = input.split('\n');

export const solution1 = () => {
let valueList:Array<number> = lines
.map((line: string) => parseInt(line));
    const greeting = `Hello TEST!`;
    return greeting;
};