const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    watch: !isProduction,
    module: {
      rules: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Injects styles into the DOM
            'css-loader',   // Turns CSS into CommonJS
            'sass-loader'   // Compiles Sass to CSS
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3131,
      historyApiFallback: true, // for react-router
      open: true // opens the browser after server has been started
    }
  };
};
