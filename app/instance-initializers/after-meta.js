export function initialize(appInstance) {
  const meta = appInstance.lookup('service:meta');
  meta.reopen({
    title: function (value) {
      return value + ' - Ship Shape';
    }
  });
}

export default {
  after: 'meta',
  name: 'after-meta',
  initialize
};
