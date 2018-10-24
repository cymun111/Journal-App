const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/client/app.js',
  output: {
    path: __dirname + '/src/client', filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          },
        }
      },
      {
         test: /\.(png|jpg)$/,
         use: [
           {
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'images/',
             publicPath: 'images/'
           }
         }
         ]
       },
       {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     },

    ]
  }
}
