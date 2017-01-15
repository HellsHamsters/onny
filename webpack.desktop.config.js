const helpers               = require('./webpack.helpers');
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {

    entry: {
        'desktop': './src/desktop/bootstrap.ts',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [helpers.root('src/desktop'), helpers.root('node_modules')],
    },

    cache: true,

    target: "electron",
    devtool: 'inline-eval-cheap-source-map',

    node: {
        __dirname: false,
        __filename: false
    },

    module: {

        rules: [

            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }

        ]

    },

    plugins: [

        new WebpackNotifierPlugin({
            title: 'Onny Desktop',
            alwaysNotify: true,
            skipFirstNotification: false
        }),

    ],

    externals: {
        'electron': 'require("electron")',
        'net': 'require("net")',
        'remote': 'require("remote")',
        'shell': 'require("shell")',
        'app': 'require("app")',
        'ipc': 'require("ipc")',
        'fs': 'require("fs")',
        'buffer': 'require("buffer")',
        'system': '{}',
        'file': '{}',
    },

    watchOptions: {
        aggregateTimeout: 1000,
        poll: 500,
    },

    output: {

        path: helpers.root('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'var'

    }

};