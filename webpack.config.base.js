const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(png|gif|wav|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.less$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'font-family': 'Avenir',
              'primary-color': '#eb008b',
              'text-color': '#fff',
              'icon-color': '#eb008b',
              'menu-icon-size': '20px',
              'menu-icon-margin-right': '0px',
            },
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      useGzip: true
    })
  ]
}