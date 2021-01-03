import HeadData from 'ember-meta/services/head-data';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default HeadData.extend({
  currentRouteModel: computed('routeName', function() {
    return getOwner(this).lookup(`route:${this.routeName}`).get('currentModel.metaTags');
  }),
});
