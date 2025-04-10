import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const compat = new FlatCompat({
    baseDirectory: dirName,
});

export default [
    {
        ignores: [
            '.cache/**',
            'node_modules/**',
            'public/**',
            'eslint.config.js',
        ],
    },
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
            'react/jsx-filename-extension': [
                1,
                { extensions: ['.js', '.jsx'] },
            ],
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
