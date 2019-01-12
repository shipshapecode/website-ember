---
authorId: rwwagner90
categories: 
  - rollup
  - shepherd.js
  - site tour
  - webpack
date: '2019-01-12'
slug: converting-a-webpack-build-to-rollup
title: Converting a Webpack Build to Rollup
---

# Converting a Webpack Build to Rollup

When we initially started on refreshing [Shepherd](https://github.com/shipshapecode/shepherd), we wanted to modernize the build process, and decided
to switch from gulp to webpack. This worked well, and was a step in the right direction, but with all the buzz around rollup 1.0, we decided to give
it a try.

In some cases, things were a simple 1:1 conversion from a webpack plugin to a rollup plugin, but other things were much less straightforward.
We'll go through each conversion, step by step here, in the hopes that it will be helpful to others who may want to take rollup for a spin. If you just want
to see the entire webpack config and the entire rollup config, you can skip to the bottom and compare them yourself.

## browser-sync-webpack-plugin -> rollup-plugin-browsersync

We use browsersync for local development of the demo/docs site, so we can see everything updating in real time across browsers. This one was a fairly
simple conversion.

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

## sass-loader -> rollup-plugin-sass

In webpack we used a combination of `sass-loader`, `css-loader`, `postcss-loader`, `file-loader`, and `extract-loader` to consume our `scss` files 
and output our various theme files.

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

We were able to replace all of these loaders with just `rollup-plugin-sass`, and `postcss`, when we switched to rollup. However, rollup has a hard
time with outputting multiple css files. It wants to consume all the styles and either bundle them as one file or just inject them into `head`
automatically for you. This made generating multiple theme files not very straightforward, but wasn't too bad, once we figured it out.

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

## Summary

The webpack build of `shepherd.min.js` was ~80 kb and the rollup build was ~25% smaller, at ~60 kb. Although getting rollup set up and working
is a lot more involved, and there are less examples than webpack, it is clearly worth the effort, for the bundle size savings alone.
