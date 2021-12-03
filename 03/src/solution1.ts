import fs = require('fs');
import path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, '../input/input1.txt'), 'utf-8')
  .replace(/(\r\n|\n|\r)/gm, '');

const numColumns = 12;
const digits = input.split('');
const numLines = digits.length / 12;

const calcGammaEpsilon = () => {
  let numCount0 = 0;
  let numCount1 = 0;
  let colTemp = [];
  let gammaBin = '';
  let epsilonBin = '';

  for (let i = 0; i < numColumns; i++) {
    colTemp = digits.filter(function (value, index) {
      if (index % numColumns === i) return value;
    });
    numCount0 = colTemp.filter(function (value) {
      return parseInt(value) == 0;
    }).length;
    numCount1 = numLines - numCount0;
    gammaBin = gammaBin + (+(numCount0 < numCount1)).toString();
    epsilonBin = epsilonBin + (+(numCount0 > numCount1)).toString();
  }
  return { gamma: gammaBin, epsilon: epsilonBin };
};

export const solution1 = () => {
  const resObj = calcGammaEpsilon();
  const result = parseInt(resObj.gamma, 2) * parseInt(resObj.epsilon, 2);
  console.log(result);
  return result;
};
