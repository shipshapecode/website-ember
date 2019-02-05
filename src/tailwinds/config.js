import container from 'tailwindcss/plugins/container';
import gradient from "./plugins/gradient";

import colors from "./config/colors";
import screens from "./config/screens";
import fonts from "./config/fonts";
import textSizes from "./config/text-sizes";
import fontWeights from "./config/font-weights";
import leading from "./config/line-height";
import tracking from "./config/letter-spacing";
import textColors from "./config/text-colors";
import backgroundColors from "./config/background-colors";
import backgroundSize from "./config/background-size";
import borderWidths from "./config/border-widths";
import borderColors from "./config/border-colors";
import borderRadius from "./config/border-radius";
import width from "./config/width";
import height from "./config/height";
import minWidth from "./config/min-width";
import minHeight from "./config/min-height";
import maxWidth from "./config/max-width";
import maxHeight from "./config/max-height";
import padding from "./config/padding";
import margin from "./config/margin";
import negativeMargin from "./config/negative-margin";
import shadows from "./config/shadows";
import zIndex from "./config/z-index";
import opacity from "./config/opacity";
import svgFill from "./config/svg-fill";
import svgStroke from "./config/svg-stroke";

export default {
  colors,
  screens,
  fonts,
  textSizes,
  fontWeights,
  leading,
  tracking,
  textColors,
  backgroundColors,
  backgroundSize,
  borderWidths,
  borderColors,
  borderRadius,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  negativeMargin,
  shadows,
  zIndex,
  opacity,
  svgFill,
  svgStroke,

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: false,
    fonts: false,
    fontWeights: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: false,
    svgFill: [],
    svgStroke: [],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive']
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    container({
      // center: true,
      // padding: '1rem',
    }),
    gradient({
      gradients: {
        'brokermate': ['#3FB7E6', '#782599']
      }
    })
  ],

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: '',
    important: false,
    separator: ':'
  }
};
