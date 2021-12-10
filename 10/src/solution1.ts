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
  errors.forEach(element => {
    if (element['found'] == ")") {
      result = result + 3;
    }
    if (element['found'] == "]") {
      result = result + 57;
    }
    if (element['found'] == "}") {
      result = result + 1197;
    }
    if (element['found'] == ">") {
      result = result + 25137;
    }

  });
  return result;
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
        errors.push({"expected" : expectedBracket, "found" : bracket} );
        break;
      }
    }
  }
}
export const solution1 = () => {
  let linesOfCode: Array<string> = []
  linesOfCode = initCode();
  const result   = checkCode(linesOfCode);
  return result;
};
