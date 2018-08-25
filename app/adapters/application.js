import AdapterFetch from '../mixins/adapter-fetch';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend(AdapterFetch, {
});
