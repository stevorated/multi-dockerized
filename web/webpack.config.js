const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';
const buildPath = path.join(__dirname, 'dist');
const keys = require('./config.keys');
const { host, port, sockPort, sockHost, title } = keys;

console.info(
    isDev ? 'running with development webpack config' : 'Production Build!'
);
console.info('=============================================================');

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'cheap-source-map',
    entry: './src/index.tsx',
    devServer: {
        host,
        port,
        sockHost,
        sockPort,
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true,
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    // === end dev server config ===

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    output: {
        path: buildPath,
        filename: 'bundle.min.js',
        // publicPath: '/dist/',
        publicPath: '/',
    },

    module: {
        rules,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: title ?? 'app',
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
            'process.env.SITE_NAME': JSON.stringify(process.env.SITE_NAME),
        }),
    ],
};
