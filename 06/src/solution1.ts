import fs = require('fs');
import path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, '../input/input1.txt'), 'utf-8')
  .replace(/(\r\n|\n|\r)/gm, '');

const lines = input.split('\n');

const initLanternfish = () => {
  console.log('TEST');
  const lanternfishSchool = lines[0].split(',');
  return lanternfishSchool;
};

const growPerDay = (lanternfishSchool) => {
  lanternfishSchool.forEach(function (age, i) {
    if (age == 0) {
      lanternfishSchool.push(8);
      lanternfishSchool[i] = 6;
    } else {
      lanternfishSchool[i]--;
    }
  });
  return lanternfishSchool;
};

const growLanternfishSchool = (lanternfishSchool) => {
  const days = 80;
  let currentDay = 1;
  do {
    lanternfishSchool = growPerDay(lanternfishSchool);
    currentDay++;
  } while (currentDay <= days);
  return lanternfishSchool;
};

export const solution1 = () => {
  let lanternfishSchool = initLanternfish();
  lanternfishSchool = growLanternfishSchool(lanternfishSchool);
  const result = lanternfishSchool.length;
  return result;
};
