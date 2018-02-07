---
author: Robert Wagner
date: 2017-11-29
slug: using-components-in-ember-mixin-unit-tests
tags: ember, ember.js, unit tests, component rendering, container
title: Using Components in Ember Mixin Unit Tests
---

In the quest to update my Ember addon from Ember 2.8 to 2.16+, I had some odd unit tests for mixins that needed to render components, but also have access to the component instance. This no longer works because `Ember.Component` complains about not having a renderer.

We were previously creating components like:
```javascript
let Component = Ember.Component.extend(FooMixin, props);
return Component.create();
```

This now throws an error like `Error: Cannot instantiate a component without a renderer. Please ensure that you are creating <(subclass of Ember.Component):ember201> with a proper container/registry.`

### Container
To get access to the container, we cannot use the vanilla qunit `module`. We must use one of the `moduleFor` given to us by ember-qunit. We must also use `integration: true`. 

#### Old
```javascript
import { module, test } from 'qunit';
```
#### New
```javascript
import { moduleForComponent, test } from 'ember-qunit';
```

## Rendering
We then need a way to render the component, but also have access to the component instance for calling methods from our mixin. We're going to use `moduleForComponent` with the normal `hbs` renderer, with some tweaks to make sure we can access the rendered component instance later.

We need to register a `stub-comp` component, to give us a stubbed component instance, and we'll want to override the `init` method of the component to set the `componentInstance` on the test context. This will allow us to call methods from the component instance later by doing something like `this.componentInstance.myMethod()`.

Here is an example of the full test setup:

```javascript
moduleForComponent('Unit | Mixin | foo mixin', {
  integration: true,
  beforeEach() {
    const testContext = this;

    this.register('component:stub-comp',
      Ember.Component.extend(TransitionMixin, {
        init() {
          this._super(...arguments);
          testContext.componentInstance = this;
        }
      })
    );
  }
});

test('it can call component methods', function(assert) {
  this.render(hbs`{{stub-comp}}`);
  let component = this.componentInstance;
  component.myMethod();
  // Here you would use sinon to assert this was called or check values etc.
});
```

Hopefully this helps someone struggling with how to refactor their old unit tests that were manually rendering components!
