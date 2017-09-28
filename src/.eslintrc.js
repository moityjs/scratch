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
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'xxx', '*\n * Created by'] }],
    'css-modules/no-undef-class': ['off'],
    'compat/compat': 'error',
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
