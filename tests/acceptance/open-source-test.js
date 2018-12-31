import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | open source', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /open-source and checking general meta', async function(assert) {
    await visit('/open-source');

    assert.equal(currentURL(), '/open-source');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/open-source/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /open-source and checking article meta', async function(assert) {
    await visit('/open-source');

    assert.equal(currentURL(), '/open-source');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article');
    assert.notOk(document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article');
  });

  test('visiting /open-source and checking opengraph meta', async function(assert) {
    await visit('/open-source');

    assert.equal(currentURL(), '/open-source');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Ember Addons and Open Source - Ship Shape', 'og title is correct');
  });

  test('visiting /open-source and checking twitter meta', async function(assert) {
    await visit('/open-source');

    assert.equal(currentURL(), '/open-source');
    assert.equal(document.head.querySelector('meta[name="twitter:description"]').content,
      'We collaborate extensively with the Ember community on all facets of Ember. From documentation, to Ember CLI, and Ember itself. We have written several Ember addons of our own, and we are maintainers for the html-next addons, including flexi and vertical-collection.',
      'twitter description is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Ember Addons and Open Source - Ship Shape',
      'twitter title is correct');
  });
});
