#!/usr/bin/env nodejs
import program from 'commander';
import fs from 'fs';
import path from 'path';
import gendiff from '../lib/gendiff';
import parser from '../lib/parsers';


const args = process.argv;

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', '[type]  Output format')
  .action((firstConfig, secondConfig) => {
    const path1 = path.resolve(firstConfig);
    const path2 = path.resolve(secondConfig);
    const extention1 = path.extname(path1);
    const extention2 = path.extname(path2);
    if (extention1 === extention2) {
      const file1 = fs.readFileSync(path1, 'utf-8');
      const file2 = fs.readFileSync(path2, 'utf-8');
      const data1 = parser.parse(file1, extention1);
      const data2 = parser.parse(file2, extention1);

      console.log(gendiff(data1, data2));
    } else {
      console.log('Error: files should be the same type');
    }
  });

program.parse(args);

export default gendiff;
