import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.host
});
