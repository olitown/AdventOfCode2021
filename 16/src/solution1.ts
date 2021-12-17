import fs = require('fs');
import path = require('path');
import * as _ from "lodash";


const input = fs.readFileSync(
  path.resolve(__dirname, '../input/input1.txt'),
  'utf-8'
);
const lines = input.split('\n');
let  sum = 0;
let  tree = [];

const hex2bin = (hex) => {
  hex = hex.replace("0x", "").toLowerCase();
  var out = "";
  for(var c of hex) {
      switch(c) {
          case '0': out += "0000"; break;
          case '1': out += "0001"; break;
          case '2': out += "0010"; break;
          case '3': out += "0011"; break;
          case '4': out += "0100"; break;
          case '5': out += "0101"; break;
          case '6': out += "0110"; break;
          case '7': out += "0111"; break;
          case '8': out += "1000"; break;
          case '9': out += "1001"; break;
          case 'a': out += "1010"; break;
          case 'b': out += "1011"; break;
          case 'c': out += "1100"; break;
          case 'd': out += "1101"; break;
          case 'e': out += "1110"; break;
          case 'f': out += "1111"; break;
          default: return "";
      }
  }
  return out;
}

const getLiteral = (decodedLit) => {
  let prefix = decodedLit.charAt(0);
  let counter = 0;
  let digitsStr = '';


  while (prefix == '1'){
    counter++;
    digitsStr = digitsStr + decodedLit.substr(counter, 4);
    counter = counter + 4;
    prefix = decodedLit.charAt(counter);
  }
  if (prefix == '0'){
    counter++;
    digitsStr = digitsStr + decodedLit.substr(counter, 4);
    counter = counter + 4;
  }
  console.log('bin:' + digitsStr + ' dec:' +  parseInt(digitsStr, 2) );

  return counter;
}



const decodePackage = (bin) => {
  const version = bin.substring(0,3);
  const type = bin.substring(3,6);
  sum = sum + parseInt(version, 2)
  let literalBin = '';
  let literalDec = 0;

  if (type == '100') {
    //literal value
    let packagelength = getLiteral(bin.substring(6));
    return packagelength+6;
  }
  else {
    //subpackages
    const lengthType = bin.charAt(6);
    if (lengthType == '0') {
      //next 15 bits are a number that represents the total length
      const totalLength = bin.substr(7,15);
      const totalLengthDec = parseInt(totalLength, 2);
      let subpackages = bin.substr(22, totalLengthDec); //substring from pos 22 length=numberofbits
      let proccessedBin = 0;
      let myLenght = 22;
      while (proccessedBin < totalLengthDec) {
        let subpackagelength = decodePackage(subpackages);
        myLenght = myLenght +subpackagelength
        const currentPackage = subpackages.substr(0, subpackagelength);
        console.log('currentPackage:' + currentPackage );

        proccessedBin = proccessedBin + subpackagelength;
        
        subpackages = subpackages.substr(subpackagelength);
      }
      return myLenght;
    }
    if (lengthType == '1') {
      //next 11 bits are a number that represents the number of sub-packets
      const numberPackages = bin.substr(7,11); 
      const numberPackagesDec = parseInt(numberPackages, 2);
      let subpackages = bin.substr(18);
      let myLenght = 18;

      for ( let i=1; i<= numberPackagesDec; i++){
        let subpackagelength = decodePackage(subpackages);
        myLenght = myLenght +subpackagelength
        const currentPackage = subpackages.substr(0,subpackagelength);
        console.log('currentPackage:' + currentPackage );
        subpackages = subpackages.substr(subpackagelength);
      }
      return myLenght;
    }

  }
  ;
}

export const solution1 = () => {
  const hex = '420D610055D273AF1630010092019207300B278BE5932551E703E608400C335003900AF0402905009923003880856201E95C00B60198D400B50034400E20101DC00E10024C00F1003C400B000212697140249D049F0F8952A8C6009780272D5D074B5741F3F37730056C0149658965E9AED7CA8401A5CC45BB801F0999FFFEEE0D67050C010C0036278A62D4D737F359993398027800BECFD8467E3109945C1008210C9C442690A6F719C48A351006E9359C1C5003E739087E80F27EC29A0030322BD2553983D272C67508E5C0804639D4BD004C401B8B918E3600021D1061D47A30053801C89EF2C4CCFF39204C53C212DABED04C015983A9766200ACE7F95C80D802B2F3499E5A700267838803029FC56203A009CE134C773A2D3005A77F4EDC6B401600043A35C56840200F4668A71580043D92D5A02535BAF7F9A89CF97C9F59A4F02C400C249A8CF1A49331004CDA00ACA46517E8732E8D2DB90F3005E92362194EF5E630CA5E5EEAD1803E200CC228E70700010A89D0BE3A08033146164177005A5AEEB1DA463BDC667600189C9F53A6FF6D6677954B27745CA00BCAE53A6EEDC60074C920001B93CFB05140289E8FA4812E071EE447218CBE1AA149008DBA00A497F9486262325FE521898BC9669B382015365715953C5FC01AA8002111721D4221007E13C448BA600B4F77F694CE6C01393519CE474D46009D802C00085C578A71E4001098F518639CC301802B400E7CDDF4B525C8E9CA2188032600E44B8F1094C0198CB16A29180351EA1DC3091F47A5CA0054C4234BDBC2F338A77B84F201232C01700042A0DC7A8A0200CC578B10A65A000601048B24B25C56995A30056C013927D927C91AB43005D127FDC610EF55273F76C96641002A4F0F8C01CCC579A8D68E52587F982996F537D600';
  const bin = hex2bin(hex);
  decodePackage(bin);
  return sum;
};
