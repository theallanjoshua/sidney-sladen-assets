const path = require('path');
const outputDir = path.join(__dirname, 'dist');
const webpackBaseConfig = require('./webpack.config.base');

module.exports = {
  mode: 'production',
  output: {
    path: outputDir,
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.[chunkhash].js',
    publicPath: '/'
  },
  ...webpackBaseConfig
}