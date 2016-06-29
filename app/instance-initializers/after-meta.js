export function initialize(appInstance) {
  const meta = appInstance.lookup('service:meta');
  meta.reopen({
    title: function (value) {
      return 'Ship Shape - ' + value;
    }
  });
}

export default {
  after: 'meta',
  name: 'after-meta',
  initialize
};
