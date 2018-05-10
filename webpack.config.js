/**
 * This is the webpack config.
 *
 * - It has several entry points for different modules in our app
 * - It generate a separate "core" bundle having all core modules
 * - It also generate an asset file that stores filenames of all the bundles
 * - It uglifies the final scripts if ran on production
 * - It generates sourcemaps if ran on non-production
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (fs.existsSync('.env')) {
  require('dotenv').config();
}

// Environment variables which should be exported outside this module
const env = {
  projectRoot: path.resolve(__dirname),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CDN_URL: process.env.CDN_URL || '',
  XHR_PREFIX: process.env.XHR_PREFIX || '',
};

const isProduction = env.NODE_ENV === 'production';

console.log('\n> Building with NODE_ENV:', env.NODE_ENV);
console.log('> Project root:', env.projectRoot);


/**
 * Index of all the entry points of our app.
 * "core" stores vendor modules and core components like Header and Footer
 */
const entryPoints = {
  vendor: [
    'react',
    'react-dom',
    'isomorphic-fetch',
    'react-redux',
    'redux',
    'redux-form',
    'redux-thunk',
  ],
  landing: './src/stories/landing/index.js',
};


const commonSCSSLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];


const webpackConfig = {
  entry: entryPoints,

  output: {
    filename: isProduction ? '[name]-[chunkhash].js' : '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: `${env.CDN_URL}/`,
  },

  context: __dirname,

  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ],
    alias: {
      src: path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.css', '.scss', '.html'],
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: [
          path.resolve(__dirname, 'assets'),
          path.resolve(__dirname, 'core'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /.*/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: 'core',
            outputPath: 'core/',
          },
        }],
        include: [path.resolve(__dirname, 'core')],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                minimize: false,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          ].concat(commonSCSSLoaders),
        }),
      },
      {
        test: /\.s?css$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'node_modules/aos'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: false,
              },
            },
          ].concat(commonSCSSLoaders),
        }),
      },
      {
        test: /.*/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: 'assets',
          },
        }],
        include: [path.resolve(__dirname, 'assets')],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'base'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      disable: !isProduction,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
      },
      CDN_URL: JSON.stringify(env.CDN_URL),
      XHR_PREFIX: JSON.stringify(env.XHR_PREFIX),
    }),
    new AssetsWebpackPlugin(),
    new SvgStore({
      svgoOptions: {
        plugins: [
          { removeTitle: true },
        ],
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      cdnUrl: env.CDN_URL,
    }),
  ],

  devtool: isProduction ? false : 'source-map',

  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: false,
    inline: true,
    historyApiFallback: true,
  },
};

if (isProduction) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    })
  );
}


module.exports = webpackConfig;
