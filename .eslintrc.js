module.exports = {
  'root': true,
  'extends': 'majestic',
  'parser': 'babel-eslint',
  'parserOptions': {
    ecmaVersion: 2016,
  },
  'rules': {
    'import/no-commonjs': 'off',
    'filenames/match-exported': ['error', 'kebab' ],
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme', 'xxx', '*\n * Created by'] }],
  },
};
