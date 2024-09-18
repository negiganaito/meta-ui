/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const ERROR = 2;

module.exports = {
  // Prettier must be last so it can override other configs
  extends: ['alloy', 'alloy/react'],

  globals: {
    JSX: true,
    __DEV__: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  overrides: [
    {
      // node scripts should be console logging so don't lint against that
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': OFF,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'], // Packages `react` related packages come first.
              ['^(@|components)(/.*|$)'], // Internal packages.
              ['^\\u0000'], // Side effect imports.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports.
              ['^.+\\.?(css)$'], // Style imports.
            ],
          },
        ],
      },
    },
  ],

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 11,
    requireConfigFile: false,
    sourceType: 'module',
  },

  plugins: [
    'react',
    'simple-import-sort',
    'sort-keys-fix',
    'import',
    // 'header',
    'no-function-declare-after-return',
    'no-only-tests',
    '@stylexjs',
  ],

  root: true,

  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@stylexjs/valid-styles': ['error'],
    eqeqeq: [ERROR, 'allow-null'],
    // 'header/header': [2, 'scripts/www/headerTemplate.js'],
    'import/first': ERROR,
    'import/newline-after-import': ERROR,
    'import/no-duplicates': ERROR,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'no-unused-vars': [ERROR, { args: 'none' }],
    'no-var': ERROR,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'no-param-reassign': OFF,
    'no-void': OFF,
    'react/no-children-prop': OFF,
  },
};
