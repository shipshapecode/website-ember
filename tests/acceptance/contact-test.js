import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | contact', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /contact and checking general meta', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://shipshape.io/contact/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /contact and checking article meta', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article');
    assert.notOk(document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article');
  });

  test('visiting /contact and checking opengraph meta', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Ship Shape', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Contact Us - Ship Shape', 'og title is correct');
  });

  test('visiting /contact and checking twitter meta', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
    assert.equal(document.head.querySelector('meta[name="twitter:description"]').content,
      'Let\'s create some amazing things together. We do Ember app development, Ember training, sponsored open source work, and anything and everything Ember. To get started on your Ember training or Ember consulting project, shoot us an email or fill out the contact form.',
      'twitter description is correct');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Contact Us - Ship Shape',
      'twitter title is correct');
  });
});
