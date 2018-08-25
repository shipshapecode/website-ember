import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType) {
    const url = this._super(...arguments);

    if (requestType === 'findAll') {
      return `${url}/authors.json`;
    } else if (requestType === 'findRecord') {
      return `${url}.json`;
    }

    return url;
  }
});
