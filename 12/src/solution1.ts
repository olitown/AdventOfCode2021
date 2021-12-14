import fs = require('fs');
import path = require('path');import * as _ from "lodash";
import { result } from 'lodash';


const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');


const findPaths = (currentcave, paths, result) => {
  let mypaths = [...paths];
  if (currentcave == 'end') {
    result++;
    return result;
  }
  const posNextCaves = mypaths.filter( (path) => 
      path.indexOf(currentcave) != -1
  );

  
  if (posNextCaves.length == 0) {
    return result;
  }
  posNextCaves.forEach( (element,i) => {
    element = element.split(currentcave).join('');
    posNextCaves[i] = element.split('-').join('');
  });
  if (currentcave == currentcave.toLowerCase() ) {
    mypaths = _.remove( mypaths, function(n) {
      return n.toString().indexOf(currentcave) == -1 
    });
  }

  posNextCaves.forEach(cave => {
    result = findPaths(cave, mypaths, result);
  });
  

  return result;
}

export const solution1 = () => {
  const paths: Array<String> = lines;
  const result = findPaths('start', paths, 0, );
  return result;
};
