---
authorId: rwwagner90
categories: 
  - ember.js
  - ember addons
  - testing ember addons
  - in-repo addon
  - in-repo engine
date: '2018-02-13'
nextSlug: using-components-in-ember-mixin-unit-tests
nextTitle: Using Components in Ember Mixin Unit Tests
previousSlug: ember-3-1-testing-and-optional-features
previousTitle: Updating to Ember 3.1 and Enabling Optional Features
slug: testing-ember-addons-in-an-app
title: Testing Ember Addons in a Real App Using ember-cli-addon-tests
---

The usual test flow, for testing most addons, is using acceptance tests with the dummy app, and testing functionality 
of your components etc. via integration and unit tests. I was not aware there was even an option to run a real app, 
consume the addon and ensure the addon interacts with the app as intended, until I was introduced to [ember-cli-addon-tests](https://github.com/tomdale/ember-cli-addon-tests).

I have been working on adding tests to [ember-cli-code-coverage](https://github.com/kategengler/ember-cli-code-coverage) using ember-cli-addon-tests, 
and I wanted to document how we are testing running our addon against a normal app, an in-repo addon, and an in-repo engine in case someone else 
has a need to test how their addon behaves in these situations.

1. [Testing with an App](#app)
1. [Testing with an in-repo Addon](#in-repo-addon)
1. [Testing with an in-repo Engine](#in-repo-engine)

<h3 id="app">Testing with an App</h3>

Testing with a vanilla app is the simplest case, and if you do not want to generate any files to test against, there is no need to create any fixtures.
If you do want to create some files to test against, like we did in ember-cli-code-coverage, you can easily create them by putting them in `test/fixtures/<your app name>`.

For us, we started with:
```bash
mkdir test/fixtures/my-app
```

We then had a couple utils we wanted to include, to see if they were covered, so we copied them into their places in fixtures,
`test/fixtures/my-app/app/utils/my-covered-util.js` and `test/fixtures/my-app/app/utils/my-uncovered-util.js`.
 
Now that we have our fixtures setup, it is time to actually use ember-cli-addon-tests to spin up the app and test our addon.
To do this, we need to setup our first mocha test. It will live in `test/integration/app-coverage-test.js`.

We first need to `require` in the test app and create a new instance of the app in our `beforeEach`. This will setup a new
app for us to test against for each of our tests. You can also specify `emberVersion` to choose which version of Ember the app
should run.
 
```javascript
// test/integration/app-coverage-test.js

// require in the test app
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

let app;

describe('app coverage generation', function() {
  this.timeout(10000000);
  beforeEach(function() {
    app = new AddonTestApp();
    return app.create('my-app', {
      emberVersion: '2.16.0'
    })
    ...
```

Now that we have instantiated our test app, we can do things like edit the package.json, run `npm install`, or whatever we need
to do to get the app in the right state to test our addon. In our case, we needed to add [ember-exam](https://github.com/trentmwillis/ember-exam)
so we could support parallel testing, and we also needed to remove our own addon, and add it back to get around symlink bugs.

```javascript
...
.then(() => {
  // Add ember-exam as a dep and remove the addon we are testing, so we can fix the symlink issue.
  app.editPackageJSON(pkg => {
    pkg.devDependencies['ember-exam'] = '0.7.0';
    // Temporarily remove the addon before install to work around https://github.com/tomdale/ember-cli-addon-tests/issues/176
    delete pkg.devDependencies['ember-cli-code-coverage'];});
  return app.run('npm', 'install').then(() => {
    app.editPackageJSON(pkg => {
      pkg.devDependencies['ember-cli-code-coverage'] = '*';
      });
    let addonPath = path.join(app.path, 'node_modules', 'ember-cli-code-coverage');
    fs.removeSync(addonPath);
    // Make sure we are symlinked to our actual addon for testing and not pointing to an installed version from npm
    fs.ensureSymlinkSync(process.cwd(), addonPath);
    // Remove old coverage directories from previous runs
    return rimraf(`${app.path}/coverage*`);
  });
});

afterEach(function() {
  // Remove coverage config to clean up
   return RSVP.all([
     rimraf(`${app.path}/config/coverage.js`)
   ]);
});
```

After finishing all this setup, we are ready to run our test app and check its output to see if our addon is working!
You can run normal commands, just like you would on the command line normally, like `app.run('ember', 'test')`.

```javascript
  it('runs coverage when env var is set', function() {
    // Make sure coverage did not already exist. `app.path` is the path to our test app's directory
    expect(dir(`${app.path}/coverage`)).to.not.exist;
    process.env.COVERAGE = true;
    // Run `ember test` with COVERAGE=true to generate code coverage in our test app
    return app.run('ember', 'test').then(function() {
      // Check the files in our test app, make sure they exist, and make sure coverage totals are correct.
      expect(file(`${app.path}/coverage/lcov-report/index.html`)).to.not.be.empty;
      expect(file(`${app.path}/coverage/index.html`)).to.not.be.empty;
      var summary = fs.readJSONSync(`${app.path}/coverage/coverage-summary.json`);
      expect(summary.total.lines.pct).to.equal(83.33);
    });
  });
```

Putting all of this together you get a test file like this:

```javascript
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

chai.use(chaiFiles);

let app;

describe('app coverage generation', function() {
  this.timeout(10000000);
  beforeEach(function() {
    app = new AddonTestApp();
    return app.create('my-app', {
      emberVersion: '2.16.0'
    }).then(() => {
      app.editPackageJSON(pkg => {
        pkg.devDependencies['ember-exam'] = '0.7.0';
        // Temporarily remove the addon before install to work around https://github.com/tomdale/ember-cli-addon-tests/issues/176
        delete pkg.devDependencies['ember-cli-code-coverage'];
      });
      return app.run('npm', 'install').then(() => {
        app.editPackageJSON(pkg => {
          pkg.devDependencies['ember-cli-code-coverage'] = '*';
        });
        let addonPath = path.join(app.path, 'node_modules', 'ember-cli-code-coverage');
        fs.removeSync(addonPath);
        fs.ensureSymlinkSync(process.cwd(), addonPath);
        return rimraf(`${app.path}/coverage*`);
      });
    });
  });

  afterEach(function() {
    return RSVP.all([
      rimraf(`${app.path}/config/coverage.js`)
    ]);
  });

  it('runs coverage when env var is set', function() {
    expect(dir(`${app.path}/coverage`)).to.not.exist;
    process.env.COVERAGE = true;
    return app.run('ember', 'test').then(function() {
      expect(file(`${app.path}/coverage/lcov-report/index.html`)).to.not.be.empty;
      expect(file(`${app.path}/coverage/index.html`)).to.not.be.empty;
      var summary = fs.readJSONSync(`${app.path}/coverage/coverage-summary.json`);
      expect(summary.total.lines.pct).to.equal(83.33);
    });
  });
});
```

This is not an out of the box working example that you can copy and paste. Things have been left out, for the sake of brevity.
To see the actual tests and fixtures, please go [here](https://github.com/kategengler/ember-cli-code-coverage/tree/46e63140a8bad15caf8bae0a15357502d55b26ff/test).

<h3 id="in-repo-addon">Testing with an in-repo Addon</h3>

Testing with an in-repo addon is similar to testing with a vanilla app, but we will need a helper to generate things for the in-repo addon.
Luckily, [@rwjblue](https://github.com/rwjblue) has us covered and created these awesome helpers in ember-engines, [in-repo-addon.js](https://github.com/ember-engines/ember-engines/blob/090333032cabfae8b3a831097d309745b87bda61/node-tests/helpers/in-repo-addon.js)
and [in-repo-engine.js](https://github.com/ember-engines/ember-engines/blob/090333032cabfae8b3a831097d309745b87bda61/node-tests/helpers/in-repo-engine.js)
which we shamelessly borrowed and used to test against our own in-repo addons and in repo engines.

The basic setup is the same as a vanilla app. You will create any fixtures you want in your app, and any fixtures you want in your
in-repo addon under `lib/<your in-repo addon name>` and do the same basic setup of your app in `beforeEach`, but
the main differences come when you do your actual test. Before running your commands with the app you generated, you will want to setup
the in-repo addon.

```javascript
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;
const InRepoAddon = require('../helpers/in-repo-addon');

chai.use(chaiFiles);

let app;

describe('in-repo addon coverage generation', function() {
  this.timeout(10000000);
  beforeEach(function() {
    // Basically the same as a vanilla app
  });

  afterEach(function() {
    // Basically the same as a vanilla app
  });

  it('runs coverage on in-repo addon', co.wrap(function* () {
    // Generate your in-repo addon inside your test app
    let addon = yield InRepoAddon.generate(app, 'my-in-repo-addon');
    // Make sure your in-repo addon has `ember-cli-babel` as a dep
    addon.editPackageJSON(
      pkg => (pkg.dependencies = { 'ember-cli-babel': '*' })
    );
    // Make sure coverage did not already exist. `app.path` is the path to our test app's directory
    expect(dir(`${app.path}/coverage`)).to.not.exist;
    process.env.COVERAGE = true;
    // Run `ember test` with COVERAGE=true just like before, but now it should include coverage for our in-repo addon
    return app.run('ember', 'test').then(function() {
      expect(file(`${app.path}/coverage/lcov-report/index.html`)).to.not.be.empty;
      expect(file(`${app.path}/coverage/index.html`)).to.not.be.empty;

      const summary = fs.readJSONSync(`${app.path}/coverage/coverage-summary.json`);
      expect(summary.total.lines.pct).to.equal(50);
      expect(summary['app/utils/my-covered-util-app.js'].lines.total).to.equal(1);

      // Check that lib/my-in-repo-addon/utils/my-covered-utill is 1 line and that 1 line is covered
      expect(summary['lib/my-in-repo-addon/addon/utils/my-covered-util.js'].lines.total).to.equal(1);
      expect(summary['lib/my-in-repo-addon/addon/utils/my-covered-util.js'].lines.covered).to.equal(1);

      // Check that lib/my-in-repo-addon/utils/my-uncovered-utill is 1 line and that 0 lines are covered
      expect(summary['lib/my-in-repo-addon/addon/utils/my-uncovered-util.js'].lines.total).to.equal(1);
      expect(summary['lib/my-in-repo-addon/addon/utils/my-uncovered-util.js'].lines.covered).to.equal(0);

      // Check that lib/my-in-repo-addon/addon-test-support/uncovered-test-support is 4 lines and that 0 lines are covered
      expect(summary['lib/my-in-repo-addon/addon-test-support/uncovered-test-support.js'].lines.total).to.equal(4);
      expect(summary['lib/my-in-repo-addon/addon-test-support/uncovered-test-support.js'].lines.covered).to.equal(0);
    });
  }));
});
```

Since we now see there is coverage info, we know our in-repo addon was generated correctly and is reporting in the coverage report.
Again, these are not examples you can copy/paste, but meant to illustrate the setup steps. The full tests can be found [here](https://github.com/kategengler/ember-cli-code-coverage/tree/46e63140a8bad15caf8bae0a15357502d55b26ff/test).

<h3 id="in-repo-engine">Testing with an in-repo Engine</h3>

Testing with an in-repo engine is almost identical to testing with an in-repo addon, but it uses a different helper, and your engine will have a
slightly different file structure.

You again start by generating your fixtures. If you do not want anything specific, just a vanilla app and vanilla in-repo engine, you do
not need to create any fixtures, but if you want to test specific files, just create them in their normal app or in-repo engine folder
structure and the tests will use the ones you provide.

After you have your fixtures setup, you will essentially do the same thing we did above in the in-repo addon tests.
The only difference is you will use the `in-repo-engine` helper in your test.

```javascript
const InRepoEngine = require('../helpers/in-repo-engine');

```

You will also need to add two deps to your engine's package.json, and you may or may not want to enable `lazy` loading.

```javascript
 it('runs coverage on in-repo engine', co.wrap(function* () {
   // We use the InRepoEngine helper here
    let engine = yield InRepoEngine.generate(app, 'my-in-repo-engine', {
      // We have lazy loading disabled
      lazy: false
    });
    // Our engine needs both babel and htmlbars, since there are templates generated in a default engine
    engine.editPackageJSON(
      pkg => (pkg.dependencies = {
        'ember-cli-babel': '*',
        'ember-cli-htmlbars': '*',
      })
    );
    expect(dir(`${app.path}/coverage`)).to.not.exist;
    process.env.COVERAGE = true;
    return app.run('ember', 'test').then(function() {
      expect(file(`${app.path}/coverage/lcov-report/index.html`)).to.not.be.empty;
      expect(file(`${app.path}/coverage/index.html`)).to.not.be.empty;

      const summary = fs.readJSONSync(`${app.path}/coverage/coverage-summary.json`);
      expect(summary.total.lines.pct).to.equal(75);
      expect(summary['app/utils/my-covered-util-app.js'].lines.total).to.equal(1);

      // Check that lib/my-in-repo-engine/utils/my-covered-utill is 1 line and that 1 line is covered
      expect(summary['lib/my-in-repo-engine/addon/utils/my-covered-util.js'].lines.total).to.equal(1);
      expect(summary['lib/my-in-repo-engine/addon/utils/my-covered-util.js'].lines.covered).to.equal(1);

      // Check that lib/my-in-repo-engine/utils/my-uncovered-utill is 1 line and that 0 lines are covered
      expect(summary['lib/my-in-repo-engine/addon/utils/my-uncovered-util.js'].lines.total).to.equal(1);
      expect(summary['lib/my-in-repo-engine/addon/utils/my-uncovered-util.js'].lines.covered).to.equal(0);
    });
  }));
```

As you can see, this is pretty much the same. Hopefully this will help some addon authors with testing their
addons against real apps. I had no idea how to accomplish this programmatically before, but this makes it quite
nice and easy to test with!
