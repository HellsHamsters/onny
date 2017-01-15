const helpers               = require('./webpack.helpers');
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {

    entry: {
        'browser': ['./src/browser/bootstrap.ts']
    },

    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            helpers.root('./src/browser'),
            helpers.root('./node_modules')
        ],
    },

    cache: true,

    target: "electron-renderer",
    devtool: 'inline-eval-cheap-source-map',

    node: {
        __dirname: true,
        __filename: true
    },

    module: {

        rules: [

            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                // @TODO exclude: [/\.(spec|e2e)\.ts$/]
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8000&name=[path][name].[ext]'
            }

        ],

    },

    plugins: [

        new WebpackNotifierPlugin({
            title: 'Onny Browser',
            alwaysNotify: false,
            skipFirstNotification: false
        }),

        new webpack.DllReferencePlugin({
            context: helpers.root('.'),
            manifest: require(helpers.root('build/dll/vendor-manifest.json'))
        }),

    ],

    watchOptions: {
        aggregateTimeout: 2000,
        poll: 1500,
    },

    output: {

        path: helpers.root('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'var'

    }

};
