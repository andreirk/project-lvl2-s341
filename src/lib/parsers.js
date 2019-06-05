const yaml = require('js-yaml');

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

const mapping = {
  '.json': file => JSON.parse(file),
  '.yml': file => parseYaml(file),
};

const parse = (file, type) => {
  const result = mapping[type](file);
  return result;
};

export default { parse };
