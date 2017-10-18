const path = require('path');
const { getLoader } = require('react-app-rewired');
const variables = require('./reactToolboxVariables');

// this is the path of eslint-loader `index.js`
const ESLINT_PATH = `eslint-loader${path.sep}index.js`;

function getEslintOptions(rules) {
  const matcher = rule => rule.loader &&
    typeof rule.loader === 'string' &&
    rule.loader.endsWith(ESLINT_PATH);
  return getLoader(rules, matcher).options;
}

function rewireEslint(config, env) {
  const options = getEslintOptions(config.module.rules);
  options.useEslintrc = true;
  options.ignore = true;
  return config;
}

function rewireCSSModules(config, env) {
  const l = getLoader(config.module.rules, rule => rule.loader && rule.loader.indexOf('css-loader') !== -1);

  l.options = {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    camelCase: true,
    localIdentName: '[local]__[hash:base64:5]',
  };
  return config;
}

function rewirePostCSS(config, env) {
  const l = getLoader(config.module.rules, rule => rule.loader && rule.loader.indexOf('postcss-loader') !== -1);

  l.options.plugins = [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          variables,
        },
      },
    }),
    require('postcss-flexbugs-fixes'),
  ];
  return config;
}

/* config-overrides.js */
module.exports = function configOverrides(config, env) {
  let rewiredConfig = config;

  rewiredConfig = rewireEslint(rewiredConfig, env);
  rewiredConfig = rewireCSSModules(rewiredConfig, env);
  rewiredConfig = rewirePostCSS(rewiredConfig, env);

  return rewiredConfig;
};
