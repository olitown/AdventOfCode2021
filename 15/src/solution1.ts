import fs = require('fs');
import _ = require('lodash');
import path = require('path');
import { json } from 'stream/consumers';
const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const getCostsNeighbours = (x,y,numLines, numCol, costmaps ) => {
  let values = [];

  if(x != 0){
    values.push(costmaps[x-1][y]); 
  }
  if(y != 0){
    values.push(costmaps[x][y-1]);
  }
  if( x != numLines-1) {
    values.push(costmaps[x+1][y]);
  }
  if( y!= numCol-1) {
    values.push(costmaps[x][y+1]);
  }

    return values;

}

const checkCost = (costmaps) => {

  let pathmap = [];
  let pathmapPrev = [];
  let tempMap = [];

  const numLines = costmaps.length;
  const numCol = costmaps[0].length;

  pathmap = new Array(numLines).fill(0).map(() => new Array(numCol).fill(999999));
  tempMap = new Array(numLines).fill(0).map(() => new Array(numCol).fill(999999));

  pathmap[0][0] = 0;

  while (JSON.stringify(pathmap) !== JSON.stringify(pathmapPrev) ) {
    pathmapPrev = _.cloneDeep(pathmap);
    tempMap = _.cloneDeep(pathmap);
    for (let i = 0; i<numLines; i++ ) {
      for (let j = 0; j< numCol; j++) {
        const newMin = Math.min.apply(Math, getCostsNeighbours(i,j,numLines, numCol, pathmap));
        if ( (newMin + costmaps[i][j]) < pathmap[i][j]  && newMin != 999999) {
          tempMap[i][j] =  newMin + costmaps[i][j];
        }
      }
    }
    console.log('new run');
    pathmap = [...tempMap];
  }
  console.log(pathmap[99][99]);

}


export const solution1 = () => {
  const costmaps = lines.map((line) => line.split('').map(Number));
  checkCost(costmaps)
  return costmaps;
};