import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend(AdapterFetch, {
});
