import { helper } from '@ember/component/helper';
import { format as formatDate } from 'date-fns';

/**
 Return the formatted date string in the given format.
 @method dateFormat
 @static
 @for date-fns/date-format
 @param {Date|String|Number} date the original date
 @param {String} format the string of tokens
 @return {String} the formatted date string
 @public
 */
export function dateFormat([date, format]) {
  return formatDate(date, format);
}

export default helper(dateFormat);
