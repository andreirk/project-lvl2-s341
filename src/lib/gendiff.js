import _ from 'lodash';
import Ast from './ast';

export default (data1, data2) => {
  const diff = Ast.build(data1, data2);
  const printable = Ast.render(diff, 2);
  return printable;
};
