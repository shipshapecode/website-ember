import Application from 'website/app';
import config from 'website/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

import './helpers/flash-message';

setApplication(Application.create(config.APP));

start();
