import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs
  .readFileSync(path.resolve(__dirname, '../input/input1.txt'), 'utf-8')
  .replace(/(\r\n|\n|\r)/gm, '');

const lines = input.split('\n');

const initLanternfish = () => {
  console.log('TEST');
  let input = [];
  const lanternfishSchool = [];
  let i = 0;
  let curAge = { curAge: 0 };
  do {
    input = lines[0].split(',');
    curAge = { curAge: i };
    lanternfishSchool[i] = input.filter(
      (fishage) => fishage == curAge.curAge,
      curAge
    ).length;
    i++;
  } while (i <= 8);
  return lanternfishSchool;
};

const growPerDay = (lanternfishSchool) => {
  lanternfishSchool.push(lanternfishSchool[0]);
  lanternfishSchool = _.drop(lanternfishSchool);
  lanternfishSchool[6] = lanternfishSchool[6] + lanternfishSchool[8];
  return lanternfishSchool;
};

const growLanternfishSchool = (lanternfishSchool) => {
  const days = 256;
  let currentDay = 1;
  do {
    lanternfishSchool = growPerDay(lanternfishSchool);
    currentDay++;
  } while (currentDay <= days);
  return lanternfishSchool;
};

export const solution2 = () => {
  let lanternfishSchool = initLanternfish();
  lanternfishSchool = growLanternfishSchool(lanternfishSchool);
  const result = _.sum(lanternfishSchool);
  return result;
};
