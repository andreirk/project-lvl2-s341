import genDiff from '../src/bin/gendiff';

const beforeJson = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const afterJson = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};

let espectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;


test('DIff ', () => {
  const diff = genDiff(beforeJson, afterJson);
  expect(diff).toBe(espectedDiff);
});

test('firstTest', () => {
  expect(3).toBe(3);
});
