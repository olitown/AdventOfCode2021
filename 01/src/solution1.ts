import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\n');

export const solution1 = () => {
  let resCounter = 0;

  let lastValue = 0;
  const valueList: Array<number> = lines.map((line: string) => parseInt(line));

  valueList.forEach((value) => {
    if (lastValue !== 0 && value > lastValue) {
      resCounter++;
    }
    lastValue = value;
  });
  console.log('result Counter= ' + resCounter);
  return resCounter;
};
