import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines: Array<string> = input.split('\r\n');

export const checkPWDValid = (value) => {
  const words: Array<string> = value.split(': ');
  const alg = words[0].split(' ');
  const positions = alg[0].split('-');

  return (
    (words[1].charAt(parseInt(positions[0]) - 1) === alg[1] &&
      words[1].charAt(parseInt(positions[1]) - 1) !== alg[1]) ||
    (words[1].charAt(parseInt(positions[0]) - 1) !== alg[1] &&
      words[1].charAt(parseInt(positions[1]) - 1) === alg[1])
  );
};

export const solution2 = () => {
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
