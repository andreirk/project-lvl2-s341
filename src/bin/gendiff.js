#!/usr/bin/env nodejs
import program from 'commander';
import fs from 'fs';
import path from 'path';
import gendiff from '../lib/gendiff';

const args = process.argv;

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', '[type]  Output format')
  .action((firstConfig, secondConfig) => {
    const file1 = fs.readFileSync(path.resolve(firstConfig), 'utf-8');
    const file2 = fs.readFileSync(path.resolve(secondConfig), 'utf-8');
    const data1 = JSON.parse(file1);
    const data2 = JSON.parse(file2);
    console.log(gendiff(data1, data2));
  });

program.parse(args);

export default gendiff;
