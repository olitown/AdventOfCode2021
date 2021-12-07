import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\n');

const initCrabs = () => {
  console.log('TEST');
  let input = [];
  input = lines[0].split(',');
  const carbs = [];
  let i = 0;
  let curPos = { curPos: 0 };
  const maxPos = Math.max(...input);
  do {
    curPos = { curPos: i };
    carbs[i] = input.filter(
      (carbPos) => parseInt(carbPos) == curPos.curPos,
      curPos
    ).length;
    i++;
  } while (i <= maxPos);
  return carbs;
};

const calcBestPosition = (crabs) => {
  const maxPos = crabs.length - 1;
  let fuel = 0;
  let minFuel = 0;

  for (let checkPos = 0; checkPos <= maxPos; checkPos++) {
    fuel = 0;
    for (let crabPos = 0; crabPos <= maxPos; crabPos++) {
      const dist = Math.abs(crabPos - checkPos);
      fuel = fuel + ((dist * dist + dist) / 2) * crabs[crabPos];
    }
    if (checkPos === 0 || fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
};

export const solution2 = () => {
  const crabs = initCrabs();
  const minFuel = calcBestPosition(crabs);
  return minFuel;
};
