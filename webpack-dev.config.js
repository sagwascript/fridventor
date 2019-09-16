const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack-common.config.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    open: true,
    openPage: './dist/index.html',
    port: 8080,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
    ],
  },
})
