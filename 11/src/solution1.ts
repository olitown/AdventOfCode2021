import fs = require('fs');
import path = require('path');
import * as _ from "lodash";

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const flashOctos = (octos) => {
  let result = 0;
  let linesize = octos[0].length;
  let numberoflines = octos.length;
  
  for (let rounds = 1; rounds <= 100; rounds++)
  {
    octos.forEach( (octoline,x) => { 
      octoline.forEach( (octo, y) => {
        octos[x][y]++;
      }); 
      
    });

    let flashingOctos:Array<object> = [];
    
    do {
      flashingOctos = [];
      octos.forEach( (octoline,x) => { 
        octoline.forEach( (octo, y) => {
          if ( octo > 9) {
            flashingOctos.push({'x' : x , 'y':  y})
          };
        }); 
      })
      flashingOctos.forEach( (flashingOcto) => {
        const x = flashingOcto['x'];
        const y = flashingOcto['y'];
        
        if(x>0){
          if(octos[x-1][y] != -1) {
            octos[x-1][y]++;
          } 
        }
        if(x<=linesize-2){
          if (octos[x+1][y] != -1) {
            octos[x+1][y]++;
          }
        }
        if(y>0){
          if (octos[x][y-1] != -1) {
            octos[x][y-1]++
          }
        }
        if(y<=numberoflines-2) {
          if (octos[x][y+1] != -1) {
            octos[x][y+1]++;
          }
        }
        if(x>0 && y> 0) {
          if (octos[x-1][y-1] != -1) {
            octos[x-1][y-1]++;
          }
        }
        if(x<=linesize-2 && y>0){
          if (octos[x+1][y-1] != -1) {
            octos[x+1][y-1]++;
          }
        }
        if(x>0 && y <= numberoflines-2){
          if (octos[x-1][y+1] != -1) {
            octos[x-1][y+1]++;
          }
        }
        if(x<=linesize-2 && y <= numberoflines-2) {
          if (octos[x+1][y+1] != -1){
            octos[x+1][y+1]++;
          }
        }
        octos[x][y] = -1;
        result++;
      });
    } while (flashingOctos.length != 0)
    
    octos.forEach( (octoline,x) => { 
      octoline.forEach( (octo, y) => {
        if ( octo == -1) {
          octos[x][y] = 0;
        };
      });
    }); 
  }
return result;
}



export const solution1 = () => {
  let  octos = lines.map((line) => line.split('').map(Number));
 // octos.forEach( (octo,i) => {octos[i] = octo.toString().split('') });
  const result  = flashOctos ( octos );
  return

};
