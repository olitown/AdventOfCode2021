import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const initHeightmap = () => {
  let heightmap = [];

  lines.forEach((line, i) => {
    return (heightmap[i] = line.split('').map(Number));
  });

  return heightmap;
};

const searchLowPoints = (heightmap) => {
  const maxX = heightmap.length;
  const maxY = heightmap[0].length;
  let lowpoints = [];

  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      let lowpoint = false;
      let pointToCheck = heightmap[i][j];
      //check left
      if (
        (i == 0 || heightmap[i - 1][j] > pointToCheck) &&
        (i == maxX - 1 || heightmap[i + 1][j] > pointToCheck) &&
        (j == 0 || heightmap[i][j - 1] > pointToCheck) &&
        (j == maxY - 1 || heightmap[i][j + 1] > pointToCheck)
      ) {
        lowpoint = true;
      }
      if (lowpoint) {
        lowpoints.push({ x: i, y: j, hight: pointToCheck });
      }
    }
  }
  return lowpoints;
};

const calcRisklevel = (lowpoint) => {
  let risklevel = 0;
  lowpoint.forEach((element) => {
    risklevel = risklevel + element['hight'] + 1;
  });
  return risklevel;
};

export const solution1 = () => {
  const heightmap = initHeightmap();
  const lowpoints = searchLowPoints(heightmap);
  const riskLevel = calcRisklevel(lowpoints);
  return riskLevel;
};
