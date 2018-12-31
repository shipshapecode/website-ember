import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/post', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog/post and checking general meta', async function(assert) {
    await visit('/blog/ember-data-belongs-to-find-or-create/');

    assert.equal(currentURL(), '/blog/ember-data-belongs-to-find-or-create/');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/blog/ember-data-belongs-to-find-or-create/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /blog/post and checking article meta', async function(assert) {
    await visit('/blog/ember-data-belongs-to-find-or-create/');

    assert.equal(currentURL(), '/blog/ember-data-belongs-to-find-or-create/');
    assert.equal(document.head.querySelector('meta[property="article:published_time"]').content,
      '2018-10-8', 'article published date is correct');

    const tags = document.head.querySelectorAll('meta[property="article:tag"]');

    assert.equal(tags[0].content, 'catch belongsTo 404', 'first tag is correct');
    assert.equal(tags[1].content, 'ember.js', 'second tag is correct');
  });

  test('visiting /blog/post and checking opengraph meta', async function(assert) {
    await visit('/blog/ember-data-belongs-to-find-or-create/');

    assert.equal(currentURL(), '/blog/ember-data-belongs-to-find-or-create/');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Creating a Default Record When a belongsTo Request Errors', 'og title is correct');
  });

  test('visiting /blog/post and checking twitter meta', async function(assert) {
    await visit('/blog/ember-data-belongs-to-find-or-create/');

    assert.equal(currentURL(), '/blog/ember-data-belongs-to-find-or-create/');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Creating a Default Record When a belongsTo Request Errors', 'twitter title is correct');

    assert.equal(document.head.querySelector('meta[name="twitter:label1"]').content,
      'Written by', 'twitter label1 is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:data1"]').content,
      'Robert Wagner', 'twitter author is correct');

    assert.equal(document.head.querySelector('meta[name="twitter:label2"]').content,
      'Filed under', 'twitter label2 is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:data2"]').content,
      'catch belongsTo 404, ember.js, ember-data, get or create',
      'twitter filed under is correct');
  });
});
