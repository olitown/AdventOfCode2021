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
    paper.push({"x": parseInt(coordinates[0]), 'y': parseInt(coordinates[1]), 'amount': 1});
  });

  return paper;
}

const foldXvertical = (paper, lineY) => {
  const numColumns = Math.max.apply(Math, paper.map(function(o) { return o.x; }));
  paper = _.sortBy(paper, ['x']);

  const numMapping = Math.max(lineY, (numColumns-1)/2)

  for(let i = 1; i<=numMapping; i++) {
    const mappingPoints = _.filter (paper, {'x': lineY+i} );
    mappingPoints.forEach( newPoint => {
      if( newPoint['x'] >lineY) {
        paper.push({"x": lineY-i, 'y': newPoint['y'], 'amount': 1});
        //remove higher point
        paper = _.remove(paper, function(n) { return !(n['x'] ===newPoint['x'] && n['y'] === newPoint['y'] && n['amount'] === newPoint['amount'])} );
      }
    });
  }
  paper = _.uniqWith(paper, _.isEqual);
  return paper;
}

const foldYhorizantal = (paper, lineY) => {
  const numColumns = Math.max.apply(Math, paper.map(function(o) { return o.x; }));
  paper = _.sortBy(paper, ['x']);

  const numMapping = Math.max(lineY, (numColumns-1)/2)

  for(let i = 1; i<=numMapping; i++) {
    const mappingPoints = _.filter (paper, {'x': lineY+i} );
    mappingPoints.forEach( newPoint => {
      if( newPoint['x'] >lineY) {
        paper.push({"x": lineY-i, 'y': newPoint['y'], 'amount': 1});
        //remove higher point
        paper = _.remove(paper, function(n) { return !(n['x'] ===newPoint['x'] && n['y'] === newPoint['y'] && n['amount'] === newPoint['amount'])} );
      }
    });
  }
  paper = _.uniqWith(paper, _.isEqual);
  return paper;
}

export const solution1 = () => {
  const temp = input.split('\r\n\r\n');

  const points = temp[0].split('\r\n');
  const instructions = temp[1].split('\r\n');
  let  paper = initPaper(points);
  paper = foldXvertical(paper, 655);
  const greeting = `Hello TEST!`;
  return greeting;
};
