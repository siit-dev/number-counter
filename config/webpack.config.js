const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssConfig = require('./postcss.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveConsolePlugin = require('remove-console-webpack-plugin');

const makeConfig = () => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '[id].css',
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      })
    );
  }

  const config = {
    entry: {
      index: ['./src/index'],
      app: ['./src/scss/app.scss'],
    },
    output: {
      path: path.resolve(__dirname, '../dist/umd'),
      filename: '[name].js',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    devServer: {
      static: './public/',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /^(?!.*\.{test,min}\.(js|ts)x?$).*\.(js|ts)x?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  const newPath = path.relative(path.dirname(resourcePath), context);
                  return newPath.replace('\\', '/') + '/css/';
                },
              },
            },
            'css-loader',
            { loader: 'postcss-loader', options: postcssConfig },
            'sass-loader',
          ],
        },
        {
          test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '../fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '../img-loader/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins,
    resolve: {
      mainFields: ['es2015', 'module', 'jsnext:main', 'main'],
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
      symlinks: false,
      cacheWithContext: false,
    },
    externals: {
      $: '$',
      jquery: 'jQuery',
    },
  };
  return config;
};

module.exports = makeConfig();
