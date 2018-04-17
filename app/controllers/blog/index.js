import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  // eslint-disable-next-line
  dateSort: ['attributes.date:desc'],
  blogPostsSortedByDate: sort('model', 'dateSort')
});
