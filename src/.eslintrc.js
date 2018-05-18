module.exports = {
  root: true,
  extends: 'majestic',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2016,
  },
  settings: {
    polyfills: ['fetch'],
  },
  plugins: ['compat'],
  rules: {
    'no-warning-comments': [
      'warn',
      { terms: ['todo', 'fixme', 'xxx', '*\n * Created by'] },
    ],
    'css-modules/no-undef-class': ['off'],
    'compat/compat': 'error',
    'function-paren-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-tag-spacing': [
      'error',
      {
        afterOpening: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'filenames/match-regex': ['warn', '^[A-Z][A-Za-z]+.test', true],
      },
    },
  ],
};
