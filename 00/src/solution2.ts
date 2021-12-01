import fs = require('fs');
import path = require('path');
const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input2.txt'),
  'utf-8'
);
const lines = input.split('\n');

export const solution2 = () => {
  const valueList: Array<number> = lines.map((line: string) => parseInt(line));
  const greeting = 'Hello TEST Solution2!';
  return greeting;
};
