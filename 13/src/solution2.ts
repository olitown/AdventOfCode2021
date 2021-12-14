import fs = require('fs');
import path = require('path');
import * as _ from "lodash";

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);


const initPaper = (points) => {
  let paper  = [];
  points.forEach(point => {
    const coordinates = point.split(',');
    paper.push({"x": parseInt(coordinates[0]), 'y': parseInt(coordinates[1])});
  });

  return paper;
}


const foldXvertical = (paper, line) => {
   let resultpaper = [];

  paper.forEach( point => {
    if( point['x'] >line) {
      resultpaper.push({"x": (line*2)-point['x'], 'y': point['y'] });
    } else {
      resultpaper.push({"x": point['x'], 'y': point['y']});
    }
  });
  resultpaper = _.uniqWith(resultpaper, _.isEqual);
  return resultpaper;
}

const foldYhorizantal = (paper, line) => {
  let resultpaper = [];
  paper.forEach( point => {
    if( point['y'] >line) {
      resultpaper.push({'x': point['x'], "y": (line*2)-point['y'] });
    }
    else {
      resultpaper.push({'x': point['x'], "y": point['y'] });
    }
  });
 resultpaper = _.uniqWith(resultpaper, _.isEqual);
  return resultpaper;
}

const fillArray = (paper) => {
  const numColumns = Math.max.apply(Math, paper.map(function(o) { return o.x; }));
  const numLines = Math.max.apply(Math, paper.map(function(o) { return o.y; }));


  let matrix = new Array(numColumns+1).fill(0).map(() => new Array(numLines+1).fill(' '));

  paper.forEach(point => {
    matrix[point['x']] [point['y']] = 'X';
    
  });
  matrix = _.unzip(matrix);
  console.log(matrix.map(it => it.join('')).join('\n'));
  return matrix;
}

export const solution2 = () => {
  const temp = input.split('\r\n\r\n');

  const points = temp[0].split('\r\n');
  const instructions = temp[1].split('\r\n');
  let  paper = initPaper(points);

  instructions.forEach( (instruction) => {
    const XYValue = instruction.split('=');
    if (XYValue[0] == 'fold along x') {
      paper = foldXvertical(paper, parseInt(XYValue[1]));
    }
    else {
      paper = foldYhorizantal(paper, parseInt(XYValue[1]));
    }
  })

  paper = fillArray(paper);
  const greeting = `Hello TEST!`;
  return greeting;
};
