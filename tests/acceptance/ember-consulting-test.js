import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember consulting', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /ember-consulting and checking general meta', async function(assert) {
    await visit('/ember-consulting');

    assert.equal(currentURL(), '/ember-consulting');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/ember-consulting/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /ember-consulting and checking article meta', async function(assert) {
    await visit('/ember-consulting');

    assert.equal(currentURL(), '/ember-consulting');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article');
    assert.notOk(document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article');
  });

  test('visiting /ember-consulting and checking opengraph meta', async function(assert) {
    await visit('/ember-consulting');

    assert.equal(currentURL(), '/ember-consulting');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Ember.js Consulting and Training - Ship Shape', 'og title is correct');
  });

  test('visiting /ember-consulting and checking twitter meta', async function(assert) {
    await visit('/ember-consulting');

    assert.equal(currentURL(), '/ember-consulting');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Ember.js Consulting and Training - Ship Shape', 'twitter title is correct');
  });
});
