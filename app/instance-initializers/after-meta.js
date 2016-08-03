export function initialize(appInstance) {
  let meta = appInstance.lookup('service:meta');
  meta.reopen({
    title(value) {
      return `Ship Shape - ${value}`;
    }
  });
}

export default {
  after: 'meta',
  name: 'after-meta',
  initialize
};
