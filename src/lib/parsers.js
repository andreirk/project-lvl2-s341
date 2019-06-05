const yaml = require('js-yaml');
const ini = require('ini');


function parseYaml(file) {
  let doc;
  try {
    doc = yaml.safeLoad(file);
    return doc;
  } catch (e) {
    console.log('error in parsers.js, parseYaml:', e);
  }
  return doc;
}

function parseIni(file) {
  let doc;
  try {
    doc = ini.parse(file);
    return doc;
  } catch (e) {
    console.log('error in parsers.js, parseIni:', e);
  }
  return doc;
}

const mapping = {
  '.json': file => JSON.parse(file),
  '.yml': file => parseYaml(file),
  '.ini': file => parseIni(file),
};

const parse = (file, type) => {
  const result = mapping[type](file);
  return result;
};

export default { parse };
