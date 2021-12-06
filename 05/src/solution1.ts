import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const convertToVentMap = () => {
  const ventMap = [];
  const lines = input.split('\r\n');
  lines.forEach((line) => {
    const points = line.split(' -> ');
    const ventStart = points[0].split(',');
    const ventEnd = points[1].split(',');
    const paths = {
      startX: ventStart[0],
      startY: ventStart[1],
      endX: ventEnd[0],
      endY: ventEnd[1]
    };
    ventMap.push(paths);
  });
  return ventMap;
};

const reduceVentMap = (ventMap) => {
  ventMap = _.filter(ventMap, function (ventObj) {
    return ventObj.startX == ventObj.endX || ventObj.startY == ventObj.endY;
  });
  return ventMap;
};


const countVents = (ventMap) => {
  const ventCounterMap;
  const maxX = _.maxBy(ventMap, function (vent) {
    if (vent['startX'] >= vent['endX']) return vent['startX'];
    else return vent['endX'];
  });
  const maxY = _.maxBy(ventMap, function (vent) {
    if (vent['startY'] >= vent['endY']) return vent['startY'];
    else return vent['endY'];
  });
  const sizeX = Math.max(maxX['startX'], maxX['endX']);
  const sizeY = Math.max(maxY['startY'], maxY['endY']);
  ventCounterMap = new Array(sizeX + 1)
    .fill(0)
    .map(() => new Array(sizeY + 1).fill(0));

  ventMap.forEach(function (vent) {
    if (vent['startX'] == vent['endX']) {
      //same X
      const range = _.range(vent['startY'], vent['endY']);
      range.push(vent['endY']);
      const x = { x: parseInt(vent['startX']) };
      range.forEach(function (yValue) {
        ventCounterMap[this.x][yValue]++;
      }, x);
    } else {
      //same Y
      const range = _.range(vent['startX'], vent['endX']);
      range.push(vent['endX']);
      const y = { y: parseInt(vent['startY']) };
      range.forEach(function (xValue) {
        ventCounterMap[xValue][this.y]++;
      }, y);
    }
  });

  return ventCounterMap;
};

const calculateResult = (ventCounterMap) => {
  ventCounterMap = ventCounterMap.flat();
  ventCounterMap = ventCounterMap.filter((amount) => amount > 1);

  return ventCounterMap.length;
};

export const solution1 = () => {
  let ventMap = convertToVentMap();
  ventMap = reduceVentMap(ventMap);
  const ventCounterMap = countVents(ventMap);
  const result = calculateResult(ventCounterMap);
  //const valueList: Array<number> = lines.map((line: string) => parseInt(line));

  return result;
};
