import { helper } from '@ember/component/helper';

export function spaceToDash([string]) {
  return string.replace(/ /g, '-');
}

export default helper(spaceToDash);
