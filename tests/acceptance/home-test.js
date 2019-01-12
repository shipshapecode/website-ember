import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / and checking general meta', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting / and checking article meta', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article');
    assert.notOk(document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article');
  });

  test('visiting / and checking opengraph meta', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Ship Shape - Ember.js Code That Won\'t Sink', 'og title is correct');
  });

  test('visiting / and checking twitter meta', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Ship Shape - Ember.js Code That Won\'t Sink', 'twitter title is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:description"]').content,
      'Ship Shape is a Washington D.C. based software consultancy specializing in all things Ember. We leverage Ember.js, and all the latest Ember addons and technologies, to create truly ambitious, state of the art applications that are future-proof and easily maintainable.',
      'twitter description is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:site"]').content,
      '@shipshapecode', 'twitter site is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:creator"]').content,
      '@shipshapecode', 'twitter creator is correct');
  });
});
