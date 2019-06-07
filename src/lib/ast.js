import _ from 'lodash';

const log = console.log;

const getSpace = times => ' '.repeat(times);

function isObject(val) {
  if (val === null) { return false; }
  return typeof val === 'object';
}

const build = (data1, data2) => {
  const data = _.union(Object.keys(data1), Object.keys(data2));
  return data.map((key) => {
    if ((isObject(data1[key]) && isObject(data2[key]))) {
      return {
        type: 'object',
        key,
        children: build(data1[key], data2[key]),
      };
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: data1[key],
      };
    } else if (data1[key] === data2[key]) {
      return {
        type: 'unchanged',
        key,
        value: data1[key] 
      };
    } else if (_.has(data2, key) && !_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    } else if (_.has(data2, key) && _.has(data1, key) && data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        valBefore: data1[key],
        valAfter: data2[key],
      };
    }
  });
};


const stringify = (value, offset) => {
  let result;
  if (_.isArray(value)) {
    result = value;
  } else if (_.isObject(value)) {
    result = Object.keys(value).reduce((acc, el) => {
      if (!_.isObject(value[el])) {
        const str = `{\n${getSpace(offset)}  ${el}: ${value[el]}\n${getSpace(offset - 2)}}`;
        return acc.concat(str);
      }
      const recStr = `\n${getSpace(offset)}  ${el}: {${stringify(value[el], offset + 4)}\n${getSpace(offset - 2)}`;
      return acc.concat(recStr);
    }, []);
  } else result = value;
  return result;
};

const getStr = (obj, step, renderFn) => {
  let result = '';
  const { type } = obj;
  switch (type) {
    case 'unchanged':
      result = `${getSpace(step)}  ${obj.key}: ${stringify(obj.value, step)}`;
      break;
    case 'added':
      result = `${getSpace(step)}+ ${obj.key}: ${stringify(obj.value, step)}`;
      break;
    case 'deleted':
      result = `${getSpace(step)}- ${obj.key}: ${stringify(obj.value, step)}`;
      break;
    case 'changed':
      result = [
        `${getSpace(step)}- ${obj.key}: ${stringify(obj.valBefore, step)}`,
        `${getSpace(step)}+ ${obj.key}: ${stringify(obj.valAfter, step)}`];
      break;
    case 'object':
      result = `${getSpace(step)}  ${obj.key}: ${renderFn(obj.children, step + 4)}`;
      break;
    default:
      result = '';
  }
  return result;
};

const render = (ast, space) => {
  const result = ast.map(node => getStr(node, space, render));
  const flatResult = _.flatten(result).join('\n');

  const resultStrArr = [
    '{',
    '\n',
    ...flatResult,
    '}',
  ];

  return resultStrArr.join('');
};

export default { build, render };
