import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {

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
    extensions: ['.tsx', '.ts', '.js'],
  },
  module : {
    rules: [
      {
        test: /\.(?:ts|mjs|cjs|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
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
