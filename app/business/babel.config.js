// eslint-disable-next-line no-undef
const styleXPlugin = require('@stylexjs/babel-plugin');

const reactStrictPreset = require('react-strict-dom/babel-preset');

// eslint-disable-next-line no-undef
const path = require('path');

// const ReactCompilerConfig = {
//   sources: (filename) => {
//     return filename.indexOf("src/fb/utils") !== -1;
//   },
// };

function getPlatform(caller) {
  return caller && caller.platform;
}

const ReactCompilerConfig = {
  target: '18', // '17' | '18' | '19'
};

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isDevelopment = api.env('development');

  const platform = api.caller(getPlatform);

  const presets = [];

  if (platform === 'web') {
    presets.push([reactStrictPreset, { debug: true, dev: isDevelopment, rootDir: __dirname }]);
  }

  presets.push(
    ['@babel/preset-env'],
    [
      '@babel/preset-react',
      {
        development: isDevelopment,
      },
    ],
    '@babel/preset-typescript',
  );

  return {
    presets,

    plugins: [
      ['babel-plugin-react-compiler', ReactCompilerConfig],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      ['relay'],
      [
        styleXPlugin,
        {
          dev: true,
          test: false,
          unstable_moduleResolution: {
            rootDir: __dirname,
            type: 'commonJS',
          },
          // useCSSLayers: true,
          // babelConfig: { plugins: ["@babel/plugin-transform-private-methods"] },
        },
      ],
      [
        'babel-plugin-fbt',
        {
          // eslint-disable-next-line no-undef
          fbtCommonPath: path.join(__dirname, 'i18n/fbt/common_strings.json'),
        },
      ],
      'babel-plugin-fbt-runtime',
      ['macros'],
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
};
