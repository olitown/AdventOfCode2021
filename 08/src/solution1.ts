import fs = require('fs');
import path = require('path');
import * as _ from "lodash";


const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const count1478 = () => {
  let count = 0;
  let signals = [];
  let numbers = [];

  const signalsAndDigits = [];

  lines.forEach( (line, i)  => {
    signalsAndDigits[i] = line.split(' | ');
  });
  const tempArray = _.unzip(signalsAndDigits);

 // signals = tempArray[0].toString().split(' ');
 //  numbers = tempArray[1].toString().split(' ');

 tempArray[1].forEach( (number, i) => {
    numbers[i] = number.toString().split(' ');
 });


  count = numbers.flat().filter(number => String(number).length == 2 ||  
          String(number).length == 3 ||
          String(number).length == 4 ||
          String(number).length == 7).length;

  return count;
}

export const solution1 = () => {
  const result = count1478();
  return result;
};
