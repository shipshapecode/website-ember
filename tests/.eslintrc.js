module.exports = {
  env: {
    embertest: true
  },
  plugins: ['ember'],
  globals: {
    percySnapshot: true
  },
  rules: {
    'ember/named-functions-in-promises': 'off',
    'ember/use-ember-get-and-set': 'off'
  }
};
