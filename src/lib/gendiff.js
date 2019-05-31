import fs from 'fs';
import path from 'path';

const compare = (first, second) => {
  let diffArr = [];
  Object.keys(first).forEach((keyInFirst) => {
    if (second[keyInFirst]) {
      if (first[keyInFirst] === second[keyInFirst]) {
        diffArr.push(['  ', `${keyInFirst}:`, ` ${first[keyInFirst]}`]);
      } else if (first[keyInFirst] !== second[keyInFirst]) {
        diffArr.push(['- ', `${keyInFirst}:`, ` ${first[keyInFirst]}`]);
      }
    } else {
      diffArr.push(['- ', `${keyInFirst}:`, ` ${first[keyInFirst]}`]);
    }
  });

  Object.keys(second).forEach((keyInSecond) => {
    if (!first[keyInSecond]) {
      diffArr.push(['+ ', `${keyInSecond}:`, ` ${second[keyInSecond]}`]);
    } else if (first[keyInSecond] !== second[keyInSecond]) {
      diffArr.push(['+ ', `${keyInSecond}:`, ` ${second[keyInSecond]}`]);
    }
  });
  diffArr = diffArr.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  });
  return diffArr;
};

const prepDiffToPrint = (diffArr) => {
  const resultStrArr = [
    '{',
    '\n',
    ...diffArr.map(el => `\t${el[0]}${el[1]}${el[2]}\n`),
    '}',
  ];

  return resultStrArr.join('');
};


export default (data1, data2) => {
  const diff = compare(data1, data2);
  const printable = prepDiffToPrint(diff);
  return printable;
};
