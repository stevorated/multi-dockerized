const path = require('path');
const nodeExternals = require('webpack-node-externals');
const isDev = process.env.NODE_ENV !== 'production';
const buildPath = path.join(__dirname, 'dist');

console.log(
  isDev ? 'running with development webpack config' : 'Production Build!'
);
console.log('=============================================================');

module.exports = {
  entry: './src/server.ts',
  mode: isDev ? 'development' : 'production',
  devtool: 'cheap-eval-source-map',
  target: 'node',
  output: {
    path: buildPath,
    filename: 'bundle.min.js',
    // devtoolModuleFilenameTemplate: buildPath,
  },
  resolve: {
    extensions: ['.ts', '.js'], //resolve all the modules other than index.ts
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        use: 'awesome-typescript-loader',
        test: /\.ts?$/,
      },
    ],
  },
  externals: [nodeExternals()],
};
