---
authorId: rwwagner90
categories: 
  - rollup
  - shepherd.js
  - site tour
  - webpack
date: '2019-02-05'
nextSlug: ember-data-belongs-to-find-or-create
nextTitle: Creating a Default Record When a belongsTo Request Errors
previousSlug: ux-trade-offs-of-two-ways-to-tour-a-site
previousTitle: 'Slideshows and Safaris: UX Trade-offs of Two Very Different Ways To Tour a Site'
slug: converting-a-webpack-build-to-rollup
title: Converting a Webpack Build to Rollup
---

When we initially started on refreshing [Shepherd](https://github.com/shipshapecode/shepherd), we wanted to modernize 
the build process, and decided to switch from gulp to [webpack](https://webpack.js.org/). This worked well, and was a 
step in the right direction, but with all the buzz around [rollup](https://rollupjs.org/) 1.0, we decided to give it a try.

In some cases, things were a simple 1:1 conversion from a webpack plugin to a rollup plugin, but other things were much less straightforward.
We'll go through each conversion, step by step here, in the hopes that it will be helpful to others who may want to take rollup for a spin. If you just want
to see the entire webpack config and the entire rollup config, you can [skip to the bottom](#configfiles) and compare them yourself.

## Table of Contents
1. [Linting](#linting)
2. [Local Development](#localdevelopment)
3. [Styles](#styles)
4. [Transpilation/Minification](#transpilationminification)
5. [Config Files](#configfiles)
6. [Summary](#summary)

## Linting 

### eslint-loader -> rollup-plugin-eslint

[ESLint](https://eslint.org/) is a linting tool for JavaScript, that allows us to enforce code style for all of our JS. We typically use it
in all our projects and we are used to it running automatically, while serving or building, since this is baked into
Ember.js, so naturally we wanted to get this same behavior with rollup.

We used [eslint-loader](https://github.com/webpack-contrib/eslint-loader) with webpack, and passed all JS through it,
excluding `node_modules`. We also had to make sure we ran it before babel transpilation.

```js
// webpack.config.js

module: {
  rules: [
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      include: [
        path.resolve(__dirname, 'src/js')
      ],
      loader: 'babel-loader'
    }
  ]
}
```

For rollup, we installed [rollup-plugin-eslint](https://github.com/TrySound/rollup-plugin-eslint) and added it to our
array of plugins.

```js
// rollup.config.js

// Add eslint to plugins
eslint(),
babel({
  exclude: 'node_modules/**'
})
```

This also needed to be added before babel still, to ensure it is run on the untranspiled code.

### stylelint-webpack-plugin -> rollup-plugin-stylelint

[Stylelint](https://github.com/stylelint/stylelint) allows us to enforce linting rules for CSS and SCSS files. 
We enforced this with [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin) previously, 
but switched to [rollup-plugin-stylelint](https://github.com/tanyaisinmybed/rollup-plugin-stylelint) for use with rollup.

First, we removed `stylelint-webpack-plugin` from our `package.json` and then added `rollup-plugin-stylelint` by running:

```bash
yarn add rollup-plugin-stylelint --dev
```

The options for both webpack and rollup are options passed directly to stylelint, so we mostly just needed to copy and paste these.

```js
// webpack.config.js
new StyleLintWebpackPlugin({
  fix: false,
  syntax: 'scss',
  quiet: false
})
```

```js
// rollup.config.js
stylelint({
  fix: false,
  include: ['src/**.scss'],
  syntax: 'scss',
  quiet: false
})
```

The one difference was we had to specify to only include `scss` files, since the input for rollup is always the JS, and we did
not want to include imported CSS, just SCSS.

## Local Development

### browser-sync-webpack-plugin -> rollup-plugin-browsersync

We use browsersync for local development of the demo/docs site, so we can see everything updating in real time across browsers. 
This one was a fairly simple conversion.

First, we removed `browser-sync-webpack-plugin` from our `package.json` and then added `rollup-plugin-browsersync` by running:

```bash
yarn add rollup-plugin-browsersync --dev
```

The config for each plugin is basically identical, so we just copied from one to the other.

```js
// webpack.config.js

new BrowserSyncPlugin(
      {
        host: 'localhost',
        watch: true,
        port: 3000,
        notify: false,
        open: true,
        server: {
          baseDir: 'docs/welcome',
          routes: {
            '/shepherd/dist/js/shepherd.js': 'dist/js/shepherd.js',
            '/shepherd/docs/welcome/js/prism.js': 'docs/welcome/js/prism.js',
            '/shepherd/docs/welcome/js/welcome.js': 'docs/welcome/js/welcome.js',
            '/shepherd/docs/welcome/css/prism.css': 'docs/welcome/css/prism.css',
            '/shepherd/docs/welcome/css/welcome.css': 'docs/welcome/css/welcome.css',
            '/shepherd/docs/welcome/sheep.svg': 'docs/welcome/sheep.svg'
          }
        }
      }, {
        reload: true
      }
    )
```

```js
// rollup.config.js

// Only add the browsersync plugin if we are in development
if (process.env.DEVELOPMENT) {
  plugins.push(browsersync({
    host: 'localhost',
    watch: true,
    port: 3000,
    notify: false,
    open: true,
    server: {
      baseDir: 'docs/welcome',
      routes: {
        '/shepherd/dist/js/shepherd.js': 'dist/js/shepherd.js',
        '/shepherd/docs/welcome/js/prism.js': 'docs/welcome/js/prism.js',
        '/shepherd/docs/welcome/js/welcome.js': 'docs/welcome/js/welcome.js',
        '/shepherd/docs/welcome/css/prism.css': 'docs/welcome/css/prism.css',
        '/shepherd/docs/welcome/css/welcome.css': 'docs/welcome/css/welcome.css',
        '/shepherd/docs/welcome/sheep.svg': 'docs/welcome/sheep.svg'
      }
    }
  }));
}
```

## Styles

### sass-loader -> rollup-plugin-sass

In webpack we used a combination of [sass-loader](https://github.com/webpack-contrib/sass-loader), 
[css-loader](https://github.com/webpack-contrib/css-loader), [postcss-loader](https://github.com/postcss/postcss-loader), 
[file-loader](https://github.com/webpack-contrib/file-loader), and [extract-loader](https://github.com/peerigon/extract-loader) 
to consume our `scss` files and output our various theme files.

```js
// webpack.config.js
const glob = require('glob');
const sassArray = glob.sync('./src/scss/shepherd-*.scss');
const sassEntries = sassArray.reduce((acc, item) => {
  const name = item.replace('.scss', '').replace('./src/', '');
  acc[name] = item;
  return acc;
}, {});

...

module.exports = [{
  entry: sassEntries,
  output: {
    // This is necessary for webpack to compile
    // But we never use removable-style-bundle.js
    filename: 'removable-[id]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s[c|a]ss$/,
         include: [
           path.resolve(__dirname, 'src/scss')
         ],
         exclude: [
           path.resolve(__dirname, 'docs/welcome/scss')
         ],
         use: [
           {
             loader: 'file-loader',
             options: {
               name: 'css/[name].css'
             }
           },
           { loader: 'extract-loader' },
           { loader: 'css-loader' },
           {
             loader: 'postcss-loader',
             options: {
               plugins: () => [autoprefixer({ grid: false })]
             }
           },
           {
             loader: 'sass-loader',
             options: {
               sourceMap: false
             }
           }
         ]
      }
    ]
  }
}];
```

We were able to replace all of these loaders with just [rollup-plugin-sass](https://github.com/differui/rollup-plugin-sass), 
and [postcss](https://github.com/postcss/postcss), when we switched to rollup. However, rollup has a hard time with 
outputting multiple css files. It wants to consume all the styles and either bundle them as one file or just inject them into `head`
automatically for you. This made generating multiple theme files not very straightforward, but wasn't **too** bad, once we figured it out.

```js
// rollup.config.js

const sassOptions = {
  output(styles, styleNodes) {
    fs.mkdirSync('dist/css', { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });

    // Loop through the style nodes and manually write css files
    styleNodes.forEach(({ id, content }) => {
      const scssName = id.substring(id.lastIndexOf('/') + 1, id.length);
      const name = scssName.split('.')[0];
      fs.writeFileSync(`dist/css/${name}.css`, content);
    });
  },
  processor: css => postcss([
    atImport(),
    autoprefixer({
      grid: false
    })
  ])
    .process(css)
    .then(result => result.css)
};

...

plugins.push(sass(sassOptions));
```

### Including tippy.js styles

In our webpack build, we aliased `tippy.js`, so that when it was imported, it would import the styles as well.

```js
// webpack.config.js

resolve: {
  alias: {
    'tippy.js': 'tippy.js/dist/tippy.all.min.js'
  }
}
```

We initially tried to use an alias in rollup as well, but could not get it to work. We decided instead to use 
[rollup-plugin-css-only](https://github.com/thgh/rollup-plugin-css-only) to handle CSS imports in the JS, and
we then injected those styles directly into the `head`.

```js
// css.js

import { isBrowserSupported } from './browser';

/**
 * Injects a string of CSS styles to a style node in <head>
 * @param {String} css
 */
export function injectCSS(css) {
  if (isBrowserSupported) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.insertBefore(style, document.head.firstChild);
  }
}
```

```js
// tour.js

import { injectCSS } from './css';
import tippy from 'tippy.js';
import tippyStyles from 'tippy.js/dist/tippy.css';

export class Tour extends Evented {
  constructor(){
    ...
    
    injectCSS(tippyStyles);
  }
}
```

## Transpilation/Minification

### babel-loader -> rollup-plugin-babel

Most modern web apps tend to use [Babel](https://babeljs.io/), so they can use next generation JavaScript today. There isn't
a ton to configure with Babel, and it was mostly just switching packages, but we also did adjust our `babel.config.js`.

#### Before

```js
// babel.config.js

module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env']
    ],
    plugins: [
      'add-module-exports',
      'lodash',
      'transform-es2015-modules-commonjs'
    ],
    env: {
      test: {
        plugins: ['istanbul']
      }
    }
  };
};
```

#### After

```js
// babel.config.js

module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-object-assign'
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ],
        plugins: [
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  };
};
```

The main differences are we no longer needed `istanbul` because `Jest` has code coverage built in, and we switched around
our module exports and transforms, so we could ship both UMD and ESM.

After the Babel config changes, we removed `babel-loader` from our `package.json` and installed `rollup-plugin-babel`.

```bash
yarn add rollup-plugin-babel --dev
```

The usage in webpack and rollup is very similar, with the only option being to ignore `node_modules`.

```js
// webpack.config.js

{
  test: /\.js$/,
  exclude: path.resolve(__dirname, 'node_modules'),
  include: [
    path.resolve(__dirname, 'src/js')
  ],
  loader: 'babel-loader'
}
```

```js
// rollup.config.js

babel({
  exclude: 'node_modules/**'
})
```

### uglifyjs-webpack-plugin -> rollup-plugin-uglify

Uglify is the most common package used for minification of JavaScript, and we used it with both webpack
and rollup, we just needed to switch which package we used. 

First we removed `uglifyjs-webpack-plugin` from our `package.json` and then we installed 
[rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify).

```bash
yarn add rollup-plugin-uglify --dev
```

This was one place where the webpack build was a lot simpler. We added the uglify plugin and only included the `min`
file, so we could use one build.

```js
// webpack.config.js

optimization: {
  minimizer: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  ]
}
```

Then we added it to our rollup plugins, but to generate both a minified, and unminified version,
we were required to use two rollup builds, which was not required in webpack. We checked for the presence
of an environment variable `DEVELOPMENT`, and generated the minified version when true.

```js
// rollup.config.js

if (!process.env.DEVELOPMENT) {
  rollupBuilds.push(
    // Generate minifed bundle
    {
      input: './src/js/shepherd.js',
      output: {
        file: 'dist/js/shepherd.min.js',
        format: 'umd',
        name: 'Shepherd',
        sourcemap: true
      },
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**'
        }),
        license({
          banner
        }),
        sass(sassOptions),
        css({ output: false }),
        uglify(),
        filesize()
      ]
    });
}
```

## Config Files

For those of you who want to see the entire config for both webpack and rollup, to compare one to the other, here they are! It may also be helpful to
check out the [PR](https://github.com/shipshapecode/shepherd/pull/309/files) where we converted from webpack to rollup, so you can see all the things involved.

### Webpack

```js
// webpack.config.js

/* global require, module, __dirname */
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PACKAGE = require('./package.json');
const banner = ['/*!', PACKAGE.name, PACKAGE.version, '*/\n'].join(' ');
const glob = require('glob');
const sassArray = glob.sync('./src/scss/shepherd-*.scss');
const sassEntries = sassArray.reduce((acc, item) => {
  const name = item.replace('.scss', '').replace('./src/', '');
  acc[name] = item;
  return acc;
}, {});

// Theme SCSS files
sassEntries['css/welcome'] = './docs/welcome/scss/welcome.scss';

module.exports = [{
  entry: sassEntries,
  output: {
    // This is necessary for webpack to compile
    // But we never use removable-style-bundle.js
    filename: 'removable-[id]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s[c|a]ss$/,
        include: [
          path.resolve(__dirname, 'src/scss')
        ],
        exclude: [
          path.resolve(__dirname, 'docs/welcome/scss')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].css'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ grid: false })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /welcome\.s[c|a]ss$/,
        include: [
          path.resolve(__dirname, 'docs/welcome/scss')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../docs/welcome/',
              name: 'css/[name].css'
            }
          },
          { loader: 'extract-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  grid: false,
                  browsers: [
                    'last 2 versions'
                  ]
                })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new StyleLintWebpackPlugin({
      fix: false,
      syntax: 'scss',
      quiet: false
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        watch: true,
        port: 3000,
        notify: false,
        open: true,
        server: {
          baseDir: 'docs/welcome',
          routes: {
            '/shepherd/dist/js/shepherd.js': 'dist/js/shepherd.js',
            '/shepherd/docs/welcome/js/prism.js': 'docs/welcome/js/prism.js',
            '/shepherd/docs/welcome/js/welcome.js': 'docs/welcome/js/welcome.js',
            '/shepherd/docs/welcome/css/prism.css': 'docs/welcome/css/prism.css',
            '/shepherd/docs/welcome/css/welcome.css': 'docs/welcome/css/welcome.css',
            '/shepherd/docs/welcome/sheep.svg': 'docs/welcome/sheep.svg'
          }
        }
      }, {
        reload: true
      }
    ),
    new webpack.BannerPlugin(banner)
  ]
}];

// Library Shepherd files
module.exports.push({
  entry: {
    'js/shepherd': './src/js/shepherd.js',
    'js/shepherd.min': './src/js/shepherd.js'
  },
  devtool: 'source-map',
  target: 'web',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Shepherd',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      'tippy.js': 'tippy.js/dist/tippy.all.min.js'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new LodashModuleReplacementPlugin
  ]
});
```

### Rollup

```js
// rollup.config.js

import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-only';
import cssnano from 'cssnano';
import { eslint } from 'rollup-plugin-eslint';
import fs from 'fs';
import license from 'rollup-plugin-license';
import postcss from 'postcss';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import stylelint from 'rollup-plugin-stylelint';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('./package.json');
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const sassOptions = {
  output(styles, styleNodes) {
    fs.mkdirSync('dist/css', { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });

    styleNodes.forEach(({ id, content }) => {
      const scssName = id.substring(id.lastIndexOf('/') + 1, id.length);
      const name = scssName.split('.')[0];
      fs.writeFileSync(`dist/css/${name}.css`, content);
    });
  },
  processor: css => postcss([
    autoprefixer({
      grid: false
    }),
    cssnano()
  ])
    .process(css)
    .then(result => result.css)
};

const plugins = [
  resolve(),
  commonjs(),
  stylelint({
    fix: false,
    include: ['src/**.scss'],
    syntax: 'scss',
    quiet: false
  }),
  eslint(),
  babel({
    exclude: 'node_modules/**'
  }),
  css({ output: false })
];

if (!process.env.DEVELOPMENT) {
  plugins.push(sass({
    output: false
  }));
}

// If we are running with --environment DEVELOPMENT, serve via browsersync for local development
if (process.env.DEVELOPMENT) {
  plugins.push(sass(sassOptions));

  plugins.push(browsersync({
    host: 'localhost',
    watch: true,
    port: 3000,
    notify: false,
    open: true,
    server: {
      baseDir: 'docs/welcome',
      routes: {
        '/shepherd/dist/css/shepherd-theme-default.css': 'dist/css/shepherd-theme-default.css',
        '/shepherd/dist/js/shepherd.js': 'dist/js/shepherd.js',
        '/shepherd/docs/welcome/js/prism.js': 'docs/welcome/js/prism.js',
        '/shepherd/docs/welcome/js/welcome.js': 'docs/welcome/js/welcome.js',
        '/shepherd/docs/welcome/css/prism.css': 'docs/welcome/css/prism.css',
        '/shepherd/docs/welcome/css/welcome.css': 'docs/welcome/css/welcome.css',
        '/shepherd/docs/welcome/sheep.svg': 'docs/welcome/sheep.svg'
      }
    }
  }));
}

plugins.push(license({ banner }));
plugins.push(filesize());

const rollupBuilds = [
  // Generate unminifed bundle
  {
    input: './src/js/shepherd.js',

    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'Shepherd',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins
  }
];

if (!process.env.DEVELOPMENT) {
  rollupBuilds.push(
    // Generate minifed bundle
    {
      input: './src/js/shepherd.js',
      output: {
        file: 'dist/js/shepherd.min.js',
        format: 'umd',
        name: 'Shepherd',
        sourcemap: true
      },
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**'
        }),
        license({
          banner
        }),
        sass(sassOptions),
        css({ output: false }),
        uglify(),
        filesize()
      ]
    });
}

export default rollupBuilds;
```

## Summary

The webpack build of `shepherd.min.js` was ~80 kb and the rollup build was ~25% smaller, at ~60 kb. Although getting rollup set up and working
is a lot more involved, and there are less examples than webpack, it is clearly worth the effort, for the bundle size savings alone.
