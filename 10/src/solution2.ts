import fs = require('fs');
import path = require('path');
import * as _ from "lodash";

const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\r\n');

const initCode = () => {
  let linesOfCode = [];

  lines.forEach((line,i) => {
    linesOfCode[i] = line.split('');    
  });
  return linesOfCode;
}

const checkCode = (linesOfCode) => {
  let result = 0;
  let errors = [];
  linesOfCode.forEach(line => {
    checkLine(line, errors);
  });
  result = calcResult(errors);
  return result;
}

const calcResult = (errors) => {
  let result = 0;
  let linescores = [];
  errors.forEach(line => {
   let linescore = 0 ;
    line.forEach (bracket => {
      let summand = 0;
      if (bracket == ")") {
        summand = 1;
      }
      if (bracket == "]") {
        summand = 2;
      }
      if (bracket == "}") {
        summand = 3;
      }
      if (bracket == ">") {
        summand = 4;
      }
      linescore = linescore * 5 + summand;
    });
    linescores.push(linescore)
  });
  linescores.sort(function(a, b) {
    return a - b;
  });
  let middle  = (linescores.length-1)/2;
  return linescores[middle];
}

const checkLine = (line:Array<string>, errors) => {
  let buffer:Array<string> = [];

  for (let i = 0; i<line.length; i++){
    let bracket = line[i];
    let expectedBracket = "";
    if (bracket == "(") {
      buffer.push(")");
    } 
    if (bracket == "[") {
      buffer.push("]");
    }
    if (bracket == "{") {
      buffer.push("}");
    }
    if (bracket == "<") {
      buffer.push(">");
    }
    if (bracket == ")" || bracket == "]" || bracket == "}" || bracket == ">") {
      expectedBracket = buffer.pop();
      if (expectedBracket != bracket) {
        //corrupted lines are skipped
        break;
      }
    }
    if (i == line.length-1 && buffer.length>0) {
      errors.push(_.reverse(buffer))
    }
  }
}
export const solution2 = () => {
  let linesOfCode: Array<string> = []
  linesOfCode = initCode();
  const result   = checkCode(linesOfCode);
  return result;
};
