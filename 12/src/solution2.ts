import fs = require('fs');
import path = require('path');import * as _ from "lodash";
import { result } from 'lodash';
import { createSecureContext } from 'tls';


const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');


const findPaths = (currentcave, paths, result, trackedPath, smallAllowed, trackedSmallCaves) => {
  let mypaths = [...paths];
  if (currentcave == 'end') {
    result++;
    console.log(trackedPath + '->End')
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
    if (trackedSmallCaves.split('->').filter((e, i, a) => a.indexOf(e) !== i).length > 0) {
      if(trackedSmallCaves.split(currentcave).length>1) {
//        console.log ("CurrentCave=" + currentcave +" trackedSmallCaves=" + trackedSmallCaves + " trackedPath=" + trackedPath)
        return result;
      }
    }

    if (currentcave == 'start'){
      mypaths = _.remove( mypaths, function(n) {
        return n.toString().indexOf(currentcave) == -1 
      });
    }
    trackedSmallCaves = trackedSmallCaves + "->"+currentcave;
/*   if (trackedSmallCaves.split('->').filter((e, i, a) => a.indexOf(e) !== i).length > 0) {
      mypaths = _.remove( mypaths, function(n) {
        return n.toString().indexOf(currentcave) == -1 
      });
    }
*/
   
    
  }
  trackedPath = trackedPath + '->' + currentcave;
  posNextCaves.forEach(cave => {
    
    result = findPaths(cave, mypaths, result, trackedPath, smallAllowed,trackedSmallCaves );
  });
  

  return result;
}

export const solution2 = () => {
  const paths: Array<String> = lines;
  const result = findPaths('start', paths, 0, '', true, '');
  return result;
};
