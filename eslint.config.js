import { defineConfig } from 'eslint/config';
import globals from 'globals';

import ts from 'typescript-eslint';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

import markdown from '@eslint/markdown';
import md from 'eslint-markdown';


import manifest from './manifest.json' with { type: 'json' };



export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,md}'] },
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,md}'], languageOptions: { globals: globals.browser } },
    {
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'prefer-const': 'error',
            'no-unused-vars': [
                'error',
                {
                    'varsIgnorePattern': '^_+$',
                    'argsIgnorePattern': '^_+$',
                },
            ],
            'no-control-regex': 'off',
            'no-constant-condition': ['error', { checkLoops: false }],
            'require-yield': 'off',
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'indent': ['error', 4, { SwitchCase: 1, FunctionDeclaration: { parameters: 'first' } }],
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'space-infix-ops': 'error',
            'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'no-cond-assign': 'error',
            'no-unneeded-ternary': 'error',
            'no-irregular-whitespace': ['error', { skipStrings: true, skipTemplates: true }],
        },
    },
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'], plugins: { jsdoc }, extends: ['jsdoc/flat/recommended-mixed'] },
    { files: ['**/*.{ts,tsx}'], plugins: { ts }, extends: ['ts/recommendedTypeChecked'], languageOptions: { parserOptions: { projectService: true } } },
    {
        files: ['**/*.md'],
        plugins: {
            markdown,
            md,
        },
        extends: [
            'markdown/recommended',
            'md/recommended',
        ],
        language: 'markdown/gfm',
        rules: {
            'md/allow-heading': [
                'error',
                {
                    h1: { allow: [`^# ${manifest.display_name}$`] },
                    h2: { allow: ['^## (?:Installation|Usage|Prerequisites)$'] },
                },
            ],
            'md/no-trailing-heading-punctuation': 'error',
            'md/require-capitalization': 'error',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
    {
        languageOptions: {
            globals: {
                SillyTavern: 'readonly',
                jQuery: 'readonly',
                $: 'readonly',
                toastr: 'readonly',
                STPALib: 'readonly',
                getUnstableSTContext: 'readonly',
            },
        },
    },
]);
