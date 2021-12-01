import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\n');

export const solution2 = () => {
  let resCounter = 0;

  let sum = 0;
  let lastsum = 0;
  const valueList: Array<number> = lines.map((line: string) => parseInt(line));

  for (let i = 0; i < valueList.length - 2; i++) {
    sum = valueList[i] + valueList[i + 1] + valueList[i + 2];
    lastsum = valueList[i - 1] + valueList[i] + valueList[i + 1];
    if (i > 0 && sum > lastsum) {
      resCounter++;
    }
  }
  console.log('result Counter= ' + resCounter);
  return resCounter;
};
