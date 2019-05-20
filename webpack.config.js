const webpack = require('webpack')
const path = require('path')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const relativePath = (...args) => path.join(process.cwd(), ...args)
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV == 'production'
const isDev = !isProd

module.exports = {
  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ],
          '@babel/react'
        ]
      },

      test: /\.jsx?$/
    }]
  },

  entry: {
    bro: relativePath('src', 'bro.js'),
    popup: relativePath('src', 'popup.js'),
  },

  output: {
    filename: '[name].js'
  },

  mode: isProd ? 'production' : 'development',
  devtool: 'cheap-module-source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    },
    minimizer: isProd ? [
      new UglifyJSPlugin()
    ] : undefined,
  },
  plugins: [
    new HandlebarsPlugin({
      entry: relativePath('src', 'manifest.json'),
      output: relativePath('dist', 'manifest.json'),
    }),
    new HandlebarsPlugin({
      entry: relativePath('src', 'popup.html'),
      output: relativePath('dist', 'popup.html'),
    }),
    new CopyPlugin([
      { from: relativePath('src', 'bro.css'), to: relativePath('dist', 'bro.css') },
    ]),
  ]
}
