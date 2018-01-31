import HistoryLocation from '@ember/routing/history-location';
import { set, get } from '@ember/object';

const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0;
  const v = c === 'x' ? r : r & 3 | 8;
  return v.toString(16);
});

let trailingHistory = HistoryLocation.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  },
  pushState(path) {
    const state = { path, uuid: uuid() };
    get(this, 'history').pushState(state, null, path);
    set(this, 'previousURL', this.getURL());
  },
  replaceState(path) {
    const state = { path, uuid: uuid() };
    get(this, 'history').replaceState(state, null, path);
    set(this, 'previousURL', this.getURL());
  },
});

export default {
  name: 'registerTrailingLocationHistory',

  initialize(application) {
    application.register('location:trailing-history', trailingHistory);
  }
};
