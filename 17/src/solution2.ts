import _ = require('lodash');

const findMinXSpeed = (xStart, xEnd) => {

  let minXSpeed = 0;
  let found = false;

  while (!found) {
    const xTarget = ( minXSpeed*( minXSpeed+1) ) / 2;

    if (xTarget >= xStart && xTarget <= xEnd) {
      found = true;
    }
    else {
      minXSpeed++;
    }

  }
  return minXSpeed; 
}

const findMaxYSpeed = (yStart, yEnd) => {
  let maxYSpeed = 0;
  let testYSpeed = 0;
  let impossibleY = false;
  let counter = 0;
  let currentY =0
  let found = false;
  let highesPointY =  ( testYSpeed*( testYSpeed+1) ) / 2;

  let maxPossibleSpeed = -1*(yEnd);

  while (testYSpeed < maxPossibleSpeed) {
    while (!impossibleY && !found) {
      currentY = highesPointY - (counter*(counter+1)) / 2;
    if (currentY <= yStart && currentY >= yEnd) {
        found = true;
        if ( maxYSpeed < testYSpeed ) {
          maxYSpeed = testYSpeed;
        }
      }
      else {
        if ( currentY <= yEnd) {
          impossibleY = true;
        }
        else {
          counter ++;
        }
      }
    }
    testYSpeed++;
    counter = 0;
    impossibleY = false;
    found = false;
  }

  return maxYSpeed;
}

const checkIfPossible = (xSpeed, ySpeed, xStart, xEnd, yStart, yEnd) => {

  let possible = false;
  let impossible = false;
  let currentX = 0;
  let currentY = 0;
  let step = 0;

  while (!possible && !impossible) {
    currentX = currentX+xSpeed;
    currentY = currentY+ySpeed;

    if (currentX >= xStart && 
      currentX <= xEnd &&
      currentY <= yStart && 
      currentY >= yEnd) {
        possible = true;
      }
    if (currentX > xEnd) {
      impossible = true;
    }
    if (currentY < yEnd) {
      impossible = true;
    }
    if (xSpeed == 0 && currentX < xStart) {
      impossible = true;
    }

    ySpeed--;
    if (xSpeed>0) {
      xSpeed--; 
    }
    step++;
  }

  return possible;
}

export const solution2 = () => {
  let result = 0;
// let  input = "target area: x=20..30, y=-10..-5";
 let input = 'target area: x=257..286, y=-101..-57';
  input = input.split('target area: ').join('');
  const temp = input.split(', ');
  temp[0] = temp[0].split('x=').join('');
  temp[1] = temp[1].split('y=').sort().join('');

  const xStart = parseInt(temp[0].split('..')[0]);
  const xEnd = parseInt(temp[0].split('..')[1]);
  const yStart = parseInt(temp[1].split('..')[0]);
  const yEnd = parseInt(temp[1].split('..')[1]);

  for (let xSpeed = 0; xSpeed <= xEnd; xSpeed++){
    for (let ySpeed = yStart; ySpeed <= -1*yStart; ySpeed++) {
      if (checkIfPossible (xSpeed, ySpeed, xStart, xEnd, yEnd, yStart) ) {
        result++;
        console.log(xSpeed + "," + ySpeed);
      }
    }

  }

  return result;
};
