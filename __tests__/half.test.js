import genDiff from '../src/bin/gendiff';

const beforeJson = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const afterJson = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const espectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff ', () => {
  const diff = genDiff(beforeJson, afterJson);
  expect(diff).toBe(espectedDiff);
});
