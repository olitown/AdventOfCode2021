import fs = require('fs');
import path = require('path');
import * as _ from "lodash";

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const initPairs = (polymer) => {
  let pairs = [];
  for(let i=0; i<polymer.length-1; i++) {
    pairs.push ({'pair' : polymer.charAt(i) + polymer.charAt(i+1) , 'number' : 1});
  }
  return pairs;
} 

const applyRule = (rule, pairs, newPairs) => {
  const instructions = rule.split(' -> ');
  const searchfor = instructions[0];
  const replaceLetter = instructions[1];
  const replaceString = searchfor.charAt(0) + replaceLetter + searchfor.charAt(1);


  let currentPair = pairs.filter( (pair) => pair['pair'] == searchfor);

  currentPair.forEach(pair => {
    newPairs.push({'pair' : searchfor.charAt(0) + replaceLetter, 'number' : pair['number']});
    newPairs.push({'pair' : replaceLetter + searchfor.charAt(1), 'number' : pair['number']});
    newPairs.push({'pair' : searchfor, 'number' : -pair['number']});
  });

  return newPairs;

}

const combinePairs = (pairs, newpairs) => {
  newpairs.forEach(newpair => {
    let currentPair = pairs.filter( (pair) => pair['pair'] == newpair['pair']);
    if(currentPair.length == 0 ) {
      pairs.push({'pair' : newpair['pair'] , 'number' : newpair['number']})
    }
    else {
      currentPair[0]['number'] = currentPair[0]['number'] + newpair['number'];
    }
  });
  return (pairs)
}

export const solution2 = () => {
  const temp =input.split('\r\n\r\n');
  let polymer = temp[0];
  const rules = temp[1].split('\r\n'); 
  const steps = _.range(1,41);
  let insertChars = [];
  let pairs = [];
  pairs = initPairs(polymer);
  steps.forEach(step => {
    console.log('Start Step:' +step);
    let newpairs = [];
    rules.forEach( (rule) => {
      newpairs = applyRule(rule, pairs, newpairs)
    });
    pairs = combinePairs(pairs, newpairs);
    newpairs = [];
    console.log('End Step:' +step);
    
  });
  
  let results = [];
  
  pairs.forEach( (pair) => {
    const twoletters = pair['pair'];
    const count = pair['number'];
    const letter1 = twoletters.charAt(0);
    const letter2 = twoletters.charAt(1);

    if (results[letter1] !== undefined) {
      results[letter1] = results[letter1] + count;
    }
    else {
      results[letter1] =count;
    }
    if (results[letter2] !== undefined) {
      results[letter2] = results[letter2] + count;
    }
    else {
      results[letter2] =count;
    }
  });

  let minValue =  999999999999999999999999; // parseInt(numChars[0]);
  let maxValue =  0; //parseInt(numChars[numChars.length-1]);
  const firstChar = polymer.charAt(0);
  const lastChar = polymer.charAt(polymer.length-1)
  results[firstChar] = results[firstChar]++;
  results[lastChar] = results[lastChar]++;
  for (const [key, value] of Object.entries(results)) { if (value > maxValue) {maxValue = value}};
  for (const [key, value] of Object.entries(results)) { if (value < minValue) {minValue = value}} ;
  const result = (maxValue - minValue)/2;
  return result;
};
