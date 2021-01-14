var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin")

// questo watcher perché webpack fa l'hotreload solo delle dipendenze dentro il bundle
// devi fare reload a mano della pagina
const filewatcherPlugin = require("filewatcher-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});


module.exports = {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      // publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
          ]
        },
        {
          test: /\.scss$/,
          use: extractPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.njk$/,
          use: [
            {
              loader: 'simple-nunjucks-loader',
              options: {}
            }
          ]
        }
      ]
    },
    plugins: [
      extractPlugin,
      new NunjucksWebpackPlugin({
        templates: [
          {
            from: "./src/templates/index.njk",
            to: "index.html"
          }
        ]
      }),
      new filewatcherPlugin({watchFileRegex: ['./src/**/*.njk']})
    ],
    devServer: {
      contentBase: 'dist',
      compress: true,
      open:true,
      port: 9000,
    }
};