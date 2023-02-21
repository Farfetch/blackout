module.exports = {
  root: true,
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['sort-imports-es6-autofix', 'eslint-plugin-tsdoc', 'prettier'],
  rules: {
    curly: 'error',
    'require-await': 'error',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'local', args: 'after-used', ignoreRestSiblings: true },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'never',
        prev: 'singleline-const',
        next: 'singleline-const',
      },
      {
        blankLine: 'never',
        prev: 'singleline-let',
        next: 'singleline-let',
      },
      { blankLine: 'never', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: 'return' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['class', 'if', 'while', 'switch', 'try'],
      },
      {
        blankLine: 'always',
        prev: ['class', 'if', 'while', 'switch', 'try'],
        next: '*',
      },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type'],
      },
    ],
    'spaced-comment': ['error', 'always'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'tsdoc/syntax': 'warn',
  },
  overrides: [
    // Disable all tsdoc checking in test files
    {
      files: ['*.test.[t|j]s*', '*.fixtures.[t|j]s*'],
      rules: {
        'tsdoc/syntax': 'off',
        // We use const xxx = () => {} many times in tests.
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'assert*'],
          },
        ],
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
