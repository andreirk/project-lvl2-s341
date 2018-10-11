import fs from 'fs';
import path from 'path';

const compare = (first, second) => {
  const diff = {};
  Object.keys(first).forEach((keyInFirst) => {
    if (second[keyInFirst]) {
      if (first[keyInFirst] !== second[keyInFirst]) {
        diff[keyInFirst] = `${keyInFirst}: ${first[keyInFirst]}`;
      }
    } else {
      diff[keyInFirst] = `- ${keyInFirst}: ${first[keyInFirst]}`;
    }
  });

  Object.keys(second).forEach((keyInSecond) => {
    if (!first[keyInSecond]) {
      diff[keyInSecond] = `+ ${keyInSecond}: ${second[keyInSecond]}`;
    }
  });
  return diff;
};


const prepDiffToPrint = (obj) => {
  const resultStrArr = [];

  resultStrArr.push('{');
  resultStrArr.push('\n');
  Object.keys(obj).forEach((key) => {
    resultStrArr.push('\t');
    if (obj[key][0] === '-' || obj[key][0] === '+') {
      resultStrArr.push(obj[key]);
    } else {
      resultStrArr.push('  ');
      resultStrArr.push(obj[key]);
    }
    resultStrArr.push('\n');
  });
  resultStrArr.push('}');

  return resultStrArr.join('');
};


export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(path.resolve(pathToFile1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(pathToFile2), 'utf-8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  const diff = compare(data1, data2);
  return prepDiffToPrint(diff);
};
