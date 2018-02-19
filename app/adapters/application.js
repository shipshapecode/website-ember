import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.host,

  ajaxOptions() {
    const options = this._super(...arguments) || {};
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/vnd.api+json';
    return options;
  }
});
