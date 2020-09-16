const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    // vendors: [
    // ],
    // components: './src/components.js',
    main: './src/main.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    port: 8080,
    watchOptions: {
      poll: true,
      ignored: '/node_modules/',
    },
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            include: path.resolve(__dirname, 'src/styles'),
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            exclude: path.resolve(__dirname, 'src/styles'),
            use: ['raw-loader', 'sass-loader'],
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: '> 1%, IE 11, not dead',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      template: './src/index.html',
      excludeChunks: [
        'components',
        // 'vendors'
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
};
