import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines: Array<string> = input.split('\r\n');

export const checkPWDValid = (value) => {
  const words = value.split(': ');
  const alg = words[0].split(' ');
  const boarders = alg[0].split('-');

  //RegEx
  const re = new RegExp(alg[1], 'g');
  // matching the pattern
  const substr: string = words[1].match(re);
  let count = 0;
  if (substr === null) {
    count = 0;
  } else {
    count = substr.length;
  }

  return count >= parseInt(boarders[0]) && count <= parseInt(boarders[1]);
};

export const solution1 = () => {
  //  let valueList: Array<number> = lines.map((line: string) => parseInt(line));

  let countPWD = 0;
  lines.forEach((value) => {
    if (checkPWDValid(value)) {
      countPWD++;
    }
    console.log(value);
  });
  const result: string = 'NumberValid: ' + countPWD;
  return result;
};
