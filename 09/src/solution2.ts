import fs = require('fs');
import path = require('path');


const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const initHeightmap = () => {
  const heightmap = [];

  lines.forEach((line, i) => {
    return (heightmap[i] = line.split('').map(Number));
  });

  return heightmap;
};

const searchLowPoints = (heightmap) => {
  const maxX = heightmap.length;
  const maxY = heightmap[0].length;
  const lowpoints = [];

  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      let lowpoint = false;
      const pointToCheck = heightmap[i][j];
      //check left
      if (
        (i == 0 || heightmap[i - 1][j] > pointToCheck) &&
        (i == maxX - 1 || heightmap[i + 1][j] > pointToCheck) &&
        (j == 0 || heightmap[i][j - 1] > pointToCheck) &&
        (j == maxY - 1 || heightmap[i][j + 1] > pointToCheck)
      ) {
        lowpoint = true;
      }
      if (lowpoint) {
        lowpoints.push({ x: i, y: j, hight: pointToCheck });
      }
    }
  }
  return lowpoints;
};

const calcRisklevel = (lowpoint) => {
  let risklevel = 0;
  lowpoint.forEach((element) => {
    risklevel = risklevel + element['hight'] + 1;
  });
  return risklevel;
};

const fillLowsTo8 = (lowpoints, heightmap) => {
  let result = 1;
  let basins = [];

  lowpoints.forEach((element) => {
    const x = element['x'];
    const y = element['y'];
    let  currentHight = element['hight'];
    let numUpdFields = 0;

   
    

    while (currentHight < 9) {
      numUpdFields = floodFill(heightmap, x, y, currentHight+1);
      if (currentHight == 8){
        basins.push(numUpdFields);
      }
      currentHight++;
    }
  });
basins.sort(function(a, b) {
  return a - b;
});

result = basins.pop() * basins.pop() * basins.pop();

}

const floodFill = (heightmap, sr, sc, newhight) => {
  //Get the input which needs to be replaced.
  const current = heightmap[sr][sc];
  let numUpdFields = 0; 
  
  //If the newColor is same as the existing 
  //Then return the original image.
  if(current === newhight){
      return 0;
  }
  
  //Other wise call the fill function which will fill in the existing image.
  numUpdFields = fill(heightmap, sr, sc, newhight, current, numUpdFields);
  
  //Return the image once it is filled
  return numUpdFields;
};

const fill = (heightmap, sr, sc, newhight, current, numUpdFields) => {
  //If row is less than 0
  if(sr < 0){
      return numUpdFields;
  }

  //If column is less than 0
  if(sc < 0){
      return numUpdFields;
  }

  //If row is greater than image length
  if(sr > heightmap.length - 1){
      return numUpdFields;
  }

  //If column is greater than image length
  if(sc > heightmap[sr].length - 1){
      return numUpdFields;
  }

  //If the current pixel is not which needs to be replaced
  if(heightmap[sr][sc] !== current){
      return numUpdFields;
  }
  
   //Update the new hight
   heightmap[sr][sc] = newhight;
   numUpdFields++;
  
  
   //Fill in all four directions
   //Fill Prev row
   numUpdFields = fill(heightmap, sr - 1, sc, newhight, current, numUpdFields);

   //Fill Next row
   numUpdFields = fill(heightmap, sr + 1, sc, newhight, current, numUpdFields);

   //Fill Prev col
   numUpdFields = fill(heightmap, sr, sc - 1, newhight, current, numUpdFields);

   //Fill next col
   numUpdFields = fill(heightmap, sr, sc + 1, newhight, current, numUpdFields);

   return numUpdFields
  
}

export const solution2 = () => {
  const heightmap = initHeightmap();
  const lowpoints = searchLowPoints(heightmap);
//  const riskLevel = calcRisklevel(lowpoints);
  const result = fillLowsTo8  (lowpoints,  heightmap);
return result;
};
