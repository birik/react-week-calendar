const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './example/src/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/src'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      },
    ],
  },
  resolve: {
    alias: {
      'react-week-calendar': path.resolve(__dirname, 'src/WeekCalendar'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'example/src/index.html'),
    }),
  ],
};
