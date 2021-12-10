import * as _ from 'lodash';
import fs = require('fs');
import path = require('path');

const bingoSize = 5;

const inputText = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);

const solution = (inputText) => {
  const { bingoNumbers, bingoCards, numberOfCards } = splitCards(inputText);
  let bingoHits = bingoInit(numberOfCards);
  let bingoNumber = 0;
  let winnerFound = false;
  let winnerCard = numberOfCards+1;
  let resultCheck = null;
  let activeCards = _.range(0,numberOfCards);
  let solutionFound = false;
  while (!solutionFound) {
    bingoNumber = bingoNumbers.shift();
    bingoHits = bingoAddNum(bingoCards, bingoHits, bingoNumber, numberOfCards);
    do {
      resultCheck = bingoCheck(bingoHits, activeCards);
      winnerFound = resultCheck.winnerFound;
      winnerCard = resultCheck.winnerCard;
      if ( winnerFound ){
        if (activeCards.length > 1) {
          _.remove(activeCards, function(n) {return n  === winnerCard;});
        }
        else {
          solutionFound = true; 
        }
      }
    } while (winnerFound && !solutionFound )
    
  }
  winnerCard = activeCards[0];
  console.log('winnerCard:' + activeCards[0]);
  return bingoWinnerCalc(bingoHits[winnerCard], bingoCards[winnerCard], bingoNumber)

}

const bingoWinnerCalc = (bingoHits, bingoCard, bingoNumber) => {
  let result = 0;
  for (let i=0; i<bingoHits.length; i++) {
    let hitColumn = bingoHits[i];
    for (let j = 0; j<hitColumn.length; j++) {
      if (bingoHits[i][j] != 1) {
        result = result + parseInt(bingoCard[i][j]); 
      }
    }
  }
  return (result * bingoNumber);
}

const bingoAddNum = (bingoCards, bingoHits, bingoNumber, numberOfCards) => {
  for (let card = 0; card < numberOfCards; card++) {
    for (let line = 0; line < bingoSize; line++) {
      const foundPos = _.indexOf(bingoCards[card][line], bingoNumber);
      if (foundPos != -1) {
        bingoHits[card][line][foundPos] = 1;
      }
    }
  }

  return bingoHits;
};

const bingoInit = (numberOfCards) => {
  const bingoBoard = Array(bingoSize * bingoSize);
  const bingoHits = [];
  for (let i = 0; i < numberOfCards; i++) {
    bingoHits[i] = _.chunk(bingoBoard, bingoSize);
  }

  return bingoHits;
};

const bingoCheck = (bingoHits, activeCards) => {
  let winnerFound = false;
  let winnerCard = null;
  let i = 0;
  let card = activeCards[0];

  while (!winnerFound && i < activeCards.length ) {
    let line = 0;
    while (!winnerFound && line < bingoSize) {
      const lineHits = bingoHits[card][line];
      winnerFound = lineHits.every((hit) => hit === 1);
      line++;
    }
    let column = 0;
    while (!winnerFound && column < bingoSize) {
      const columnHits = bingoHits[card].map(function (value) {
        return value[column];
      });
      winnerFound = columnHits.every((hit) => hit === 1);
      column++;
    }
    if (winnerFound) {
      winnerCard = card;
    }
    i++;
    card = activeCards[i];
  }

  return { winnerFound, winnerCard };
};

const splitCards = (inputText) => {
  inputText = inputText.replaceAll('  ', ' ');
  let arrayTemp = inputText.split('\r\n');
  let bingoNumbers = arrayTemp[0];
  const bingoCards = [];
  const oneCard = [];
  let multiLines = [];
  let numberOfCards = 0;
  arrayTemp = _.takeRight(arrayTemp, arrayTemp.length - 2);
  _.remove(arrayTemp, function (line) {
    return line == '';
  });
  for (let i = 0; i < arrayTemp.length / bingoSize; i++) {
    multiLines = _.chunk(arrayTemp, bingoSize);
    for (let j = 0; j < bingoSize; j++) {
      const line = multiLines[i][j].trim();
      oneCard[j] = _.split(line, ' ');
    }
    _.remove(oneCard, function (value) {
      return value == '';
    });
    //oneCard = _.chunk(oneCard, bingoSize);
    bingoCards[i] = [...oneCard];
    numberOfCards++;
  }

  bingoNumbers = bingoNumbers.split(',');

  return { bingoNumbers, bingoCards, numberOfCards };
};


export const solution2 = () => {
// solution(inputText);

  return solution(inputText);
};
