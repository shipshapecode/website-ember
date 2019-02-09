import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class Index extends Route {
  async model() {
    let authors = await fetch('/authors/authors.json');
    authors = await authors.json();
    authors = authors.data;

    return authors;
  }
}
