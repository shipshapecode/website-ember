import { helper as buildHelper } from '@ember/component/helper';

export function spaceToDash([string]) {
  return string.replace(/ /g, '-');
}

export default buildHelper(spaceToDash);
