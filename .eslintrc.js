module.exports = {
    ignorePatterns: ['dist/'],
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        sourceType: 'module', // Allows for the use of imports
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports' },
        ],
    },
};
