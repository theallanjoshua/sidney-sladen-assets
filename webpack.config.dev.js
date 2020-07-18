const webpackBaseConfig = require('./webpack.config.base');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 8081,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    https: true,
    proxy: [{
      context: ['/api'],
      target: 'http://localHost:8080',
      changeOrigin: true,
      secure: false
    }]
  },
  ...webpackBaseConfig
}