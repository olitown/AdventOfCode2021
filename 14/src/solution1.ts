import fs = require('fs');
import path = require('path');
import * as _ from "lodash";

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const applyRule  = (polymer, rule, insertChars) => {
  const instructions = rule.split(' -> ');
  const searchfor = instructions[0];
  const replaceLetter = instructions[1];
  const replaceString = searchfor.charAt(0) + replaceLetter + searchfor.charAt(1);
  
  let startFrom = 0;
  let index = polymer.indexOf(searchfor, startFrom);
  while (index !==  -1) {
    insertChars.push({'letter': replaceLetter, 'position': index+1});
    startFrom = index;
    index = polymer.indexOf(searchfor, startFrom+1);
  }
  
  return insertChars; 
}

const updatePolymer = (insertChars, polymer) => {
  insertChars = _.sortBy(insertChars, ['position']);
  insertChars.forEach( (insert, i) => {
    var letter = insert['letter'];
    var position = insert['position'];
    polymer = polymer.slice(0,position+i) + letter + polymer.slice(position+i);
    
  });
  return polymer;
}

export const solution1 = () => {
  const temp =input.split('\r\n\r\n');
  let polymer = temp[0];
  const rules = temp[1].split('\r\n'); 

  const steps = _.range(1,41);

  let insertChars = [];

  steps.forEach(step => {
    rules.forEach(rule => {
      insertChars = applyRule(polymer, rule, insertChars);
     
    });
    polymer = updatePolymer(insertChars, polymer);
    insertChars = [];
    console.log('Step:' + step);
  });
  const numCharsObj = [...polymer.split('')].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}) ;
  let  numChars = _.sortBy(numCharsObj);

  const minValue = parseInt(numChars[0]);
  const maxValue = parseInt(numChars[numChars.length-1]);
 

  const result = maxValue - minValue;
  return result;
};
