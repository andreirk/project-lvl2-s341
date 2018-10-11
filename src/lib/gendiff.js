import fs from 'fs';
import path from 'path';

export const compare = (file1, file2) => {
  console.log('files', { file1, file2 });
  return 'difference';
};

export default (pathToFile1, pathToFile2) => {
  const rawData1 = fs.readFileSync(path.resolve(pathToFile1), 'utf-8');
  const rawData2 = fs.readFileSync(path.resolve(pathToFile2), 'utf-8');
  const data1 = JSON.parse(rawData1);
  const data2 = JSON.parse(rawData2);

  const diff = compare(data1, data2);
  return diff;
};

