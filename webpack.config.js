const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';

const clientConfig = {
  name: 'client',
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: isDev ? 'bundle.js' : '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.module.css'],
    alias: {
      '@client': path.resolve(__dirname, 'src/client'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.module\.css$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                  modules: {
                    namedExport: false,
                    exportLocalsConvention: 'camel-case-only',
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
};


const serverConfig = {
  name: 'server',
  target: 'node',
  mode: isDev ? 'development' : 'production',
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@server': path.resolve(__dirname, 'src/server'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  devtool: isDev ? 'inline-source-map' : false,
  optimization: {
    minimize: false,
  },
};

module.exports = [clientConfig, serverConfig];
