import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.config({
    extends: ['airbnb', 'plugin:prettier/recommended'],
    plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    globals: {
      __PATH_PREFIX__: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      'import/no-unresolved': [
        2,
        {
          ignore: ['^gatsby-.*$'],
        },
      ],
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
        },
      ],
    },
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2021,
          sourceType: 'module',
        },
      },
      {
        files: ['gatsby-*.js'],
        rules: {
          'import/no-extraneous-dependencies': 'off',
          'import/prefer-default-export': 'off',
        },
      },
    ],
  }),
];