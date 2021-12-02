import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\n');

export const solution1 = () => {
  const position = { horizontal: 0, depth: 0 };
  for (const line of lines) {
    const words = line.split(' ');
    const inst = words[0];
    const val = words[1];
    switch (inst) {
      case 'forward':
        position.horizontal = position.horizontal + parseInt(val);
        break;
      case 'up':
        //due to instructions, up will decrease the depth
        position.depth = position.depth - parseInt(val);
        break;
      case 'down':
        //due to instructions, up will increase the depth
        position.depth = position.depth + parseInt(val);
        break;
    }
  }

  console.log(JSON.stringify(position));
  console.log('Result: ' + position.depth * position.horizontal);
  return position.depth * position.horizontal;
};
