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
  let winnerCard = null;
  let resultCheck = null;
  while (!winnerFound) {
    bingoNumber = bingoNumbers.shift();
    bingoHits = bingoAddNum(bingoCards, bingoHits, bingoNumber, numberOfCards);
    resultCheck = bingoCheck(bingoHits);
    winnerFound = resultCheck.winnerFound;
    winnerCard = resultCheck.winnerCard;
  }
  console.log('winnerCard:' + winnerCard);

};

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

const bingoCheck = (bingoHits) => {
  let winnerFound = false;
  let winnerCard = null;

  let card = 0;
  while (!winnerFound && card < bingoHits.length) {
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
    card++;
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

export const solution1 = () => {
  solution(inputText);

  return solution(inputText);
};
