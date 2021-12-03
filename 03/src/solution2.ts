import fs = require('fs');
import path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, '../input/input1.txt'), 'utf-8')
  .replace(/(\r\n|\n|\r)/gm, '');

const digits = input.split('');
const numColumns = 12;
const diagnosticReport = [];

const bitChecker = (ratings, type) => {
  let numLines = ratings.lenght;
  let colTemp = [];
  let numCount0 = 1;
  let numCount1 = 0;
  let keep = 0;

  //loop over columns
  for (let i = 0; i < numColumns; i++) {
    numLines = ratings.length;

    //read column
    colTemp = ratings.map(function (value) {
      return value[i];
    });

    //count 0
    numCount0 = colTemp.filter(function (value) {
      return parseInt(value) == 0;
    }).length;
    //count 1
    numCount1 = numLines - numCount0;

    if (numCount0 > numCount1) {
      if (type === 'Oxygen') {
        keep = 0;
      } else if (type === 'CO2') {
        keep = 1;
      }
    } else {
      if (type === 'Oxygen') {
        keep = 1;
      } else if (type === 'CO2') {
        keep = 0;
      }
    }
    ratings = ratings.filter(function (rowToCheck) {
      return rowToCheck[i] == keep;
    });
    if (ratings.length === 1) {
      i = numColumns;
    }
  }
  console.table(ratings);
  const result = ratings[0].join('');
  return result;
};

const calcOxygenCO2 = () => {
  //Create multidimensional arry
  while (digits.length) diagnosticReport.push(digits.splice(0, numColumns));
  const ratingOxygen = [...diagnosticReport];
  const ratingCO2 = [...diagnosticReport];

  const oxygen = bitChecker(ratingOxygen, 'Oxygen');
  const co2 = bitChecker(ratingCO2, 'CO2');

  return { oxygen: oxygen, co2: co2 };
};

export const solution2 = () => {
  const resObj = calcOxygenCO2();
  const result = parseInt(resObj.oxygen, 2) * parseInt(resObj.co2, 2);
  return result;
};
