import fs = require('fs');
import path = require('path');
import * as _ from "lodash";
import { range, result, split, values } from "lodash";
import { cachedDataVersionTag } from 'v8';
import { count } from 'console';

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const process = () => {
  let count = 0;
  let signals = [];
  let numbers = [];
  let value = 0;

  let signalsAndDigits = [];

  lines.forEach( (line, i)  => {
    signalsAndDigits = line.split(' | ');  
    value = value + calcOneLine(signalsAndDigits[0].split(' '), signalsAndDigits[1].split(' '))
  });
  

  return value;
}

const calcOneLine = (signals, digits) => {
  let result = 0;
  let a, b, c, d, e, f, g;
  let numbers = new Array(10).fill(0);
  
  numbers[1] = signals.filter( element => String(element).length == 2 )[0];
  numbers[4] = signals.filter( element => String(element).length == 4 )[0];
  numbers[7] = signals.filter( element => String(element).length == 3 )[0];
  numbers[8] = signals.filter( element => String(element).length == 7 )[0];
 
  const signalStr = signals.toString();

  let segmentCount = {};
  segmentCount = [
      {'segment': 'a', 'count' : signalStr.split('').filter( element => String(element) == 'a' ).length },
      {'segment': 'b', 'count' : signalStr.split('').filter( element => String(element) == 'b' ).length },
      {'segment': 'c', 'count' : signalStr.split('').filter( element => String(element) == 'c' ).length },
      {'segment': 'd', 'count' : signalStr.split('').filter( element => String(element) == 'd' ).length },
      {'segment': 'e', 'count' : signalStr.split('').filter( element => String(element) == 'e' ).length },
      {'segment': 'f', 'count' : signalStr.split('').filter( element => String(element) == 'f' ).length },
      {'segment': 'g', 'count' : signalStr.split('').filter( element => String(element) == 'g' ).length }]

  a = _.difference(numbers[7].split(''), numbers[1].split(''))[0];
  b = _.find(segmentCount, function(o) { return o['count'] == 6; })['segment'];
  e = _.find(segmentCount, function(o) { return o['count'] == 4; })['segment'];
  f = _.find(segmentCount, function(o) { return o['count'] == 9; })['segment'];

  let candidateC = numbers[1];
  candidateC = candidateC.replace(f,'')
  c = candidateC;

  let candidateD = numbers[4];
  candidateD = candidateD.replace(b, '');
  candidateD = candidateD.replace(c, '');
  candidateD = candidateD.replace(f, '');
  d = candidateD;

  let candidateG = numbers[8];
  candidateG = candidateG.replace(a, '');
  candidateG = candidateG.replace(b, '');
  candidateG = candidateG.replace(c, '');
  candidateG = candidateG.replace(d, '');
  candidateG = candidateG.replace(e, '');
  candidateG = candidateG.replace(f, '');
  g= candidateG;

  digits.forEach(( digit, i) => digits[i] = digits[i].split('').sort().join(''));

  let realNumbers = {};
  realNumbers = [{'number' : '0', 'string': String(a+b+c+e+f+g).split('').sort().join('') }, //'abcefg'; 
  {'number' : '1', 'string': String((c+f)).split('').sort().join('') }, //'cf'; 
  {'number' : '2', 'string': String((a+c+d+e+g)).split('').sort().join('') }, //'acdeg'
  {'number' : '3', 'string': String((a+c+d+f+g)).split('').sort().join('') },//'acdfg'
  {'number' : '4', 'string': String((b+c+d+f)).split('').sort().join('') }, //'bcdf'
  {'number' : '5', 'string': String((a+b+d+f+g)).split('').sort().join('') }, //'abdfg'
  {'number' : '6', 'string': String((a+b+d+e+f+g)).split('').sort().join('') }, //'abdefg'
  {'number' : '7', 'string': String((a+c+f)).split('').sort().join('') }, //'acf'
  {'number' : '8', 'string': String((a+b+c+d+e+f+g)).split('').sort().join('') }, //'abcdefg'
  {'number' : '9', 'string': String((a+b+c+d+f+g)).split('').sort().join('')} ]; //'abcdfg'
  
  let results = [];
  results[0] = _.find(realNumbers, function(o) { return o['string'] == digits[0]; })['number'];
  results[1] = _.find(realNumbers, function(o) { return o['string'] == digits[1]; })['number'];
  results[2] = _.find(realNumbers, function(o) { return o['string'] == digits[2]; })['number'];
  results[3] = _.find(realNumbers, function(o) { return o['string'] == digits[3]; })['number'];

  result = parseInt(results[0] + results[1] + results[2] + results[3]);
  
  return result;
}

export const solution2 = () => {
  const result = process();
  return result;
};
