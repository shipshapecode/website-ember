import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend(AdapterFetch, {
  host: ENV.host,

  ajaxOptions() {
    const options = this._super(...arguments);
    options.headers['content-type'] = 'application/vnd.api+json';
    return options;
  }
});
