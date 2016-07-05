var path = require('path');
var webpack = require('webpack');

var config = {
    context: path.join(__dirname, 'src/examples'),
    entry: {
        todomvc: './todomvc/client.js',
        auth: './auth/client.js'
    },
    output: {
        path: path.join(__dirname, 'src/examples/dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
          {
            test: /\.less$/,
            loader: "style!css!sass"
          },
          {
              test: /\.css/,
              loader: "style!css"
          },
          {
              test: /\.(eot|woff|ttf|svg|png|jpg|gif|woff|woff2)$/,
              loader: 'url?limit=30000&name=[name]-[hash].[ext]'
          },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',//?cacheDirectory=true',
            query: {
              presets: ['es2015', 'react'/*, 'stage-0', 'stage-1', 'stage-2', 'stage-3'*/],
              plugins: ['transform-runtime']
            }
          }
        ]
    },
    devtool: 'source-map'
};

module.exports = config;
