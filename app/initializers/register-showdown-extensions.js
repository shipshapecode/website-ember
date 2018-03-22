import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

export function initialize() {
  showdown.extension('showdownHighlight', showdownHighlight);
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
