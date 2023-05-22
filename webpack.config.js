const  { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode : 'development',
  entry : './src/index.tsx',
  devServer : {
    static: './dist',
  },
  output : {
    path: '/dist',
    filename: 'my-first-webpack.bundle.js',
  },
  plugins : [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html',
    }),
  ],
  resolve : {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  module : {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  }
}
