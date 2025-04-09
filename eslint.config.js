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
    rules: {
      'prettier/prettier': 'error',
    },
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      },
    ],
  }),
];