export const helpers = function(str) {
  return str.replace(/[^\x20-\x7E]/gmi, '').replace(/\s{2,10}/g, ' ');
}
