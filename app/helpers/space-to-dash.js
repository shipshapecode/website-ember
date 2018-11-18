import { helper } from '@ember/component/helper';

export function spaceToDash([string]) {
  return string.replace(' ', '-');
}

export default helper(spaceToDash);
