#!/usr/bin/env nodejs
import program from 'commander';
import gendiff from '../lib/gendiff';

const args = process.argv;

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', '[type]  Output format')
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig)));

program.parse(args);

