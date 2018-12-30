import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog and checking general meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/blog/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /blog and checking article meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article');
    assert.notOk(document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article');
  });

  test('visiting /blog and checking opengraph meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Blog - Ship Shape', 'og title is correct');
  });

  test('visiting /blog and checking twitter meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Blog - Ship Shape', 'twitter title is correct');
  });
});
