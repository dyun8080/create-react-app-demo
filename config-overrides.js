const { injectBabelPlugin } = require('react-app-rewired');
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
const rewireCssModules = require('react-app-rewire-css-modules');

const rewireLess = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);

  config = rewireCssModules(config, env);

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "red"
    },
    javascriptEnabled: true,
  })(config, env);

  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env)
  }

  return config;
};