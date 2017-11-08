import AdapterFetch, { mungOptionsForFetch } from 'ember-fetch/mixins/adapter-fetch';

export default Mixin.create(AdapterFetch, {
  ajaxOptions(url, type, options = {}) {
    options.headers['content-type'] = 'application/vnd.api+json';
    options.url = url;
    options.type = type;
    return mungOptionsForFetch(options, this);
  }
});
