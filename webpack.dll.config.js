const webpack = require('webpack');
const helpers = require('./webpack.helpers');

module.exports = {

    entry: {
        vendor: [
            helpers.root('./src/browser/vendor.ts'),
        ]
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

    node: {
        __dirname: true,
        __filename: true
    },

    plugins: [

        new webpack.DllPlugin({
            path: helpers.root('build/dll/[name]-manifest.json'),
            name: "[name]",
            context: helpers.root('src/browser')
        }),

        new webpack.optimize.UglifyJsPlugin()

    ],

    output: {
        path: helpers.root('build/dll'),
        filename: "dll.[name].js",
        library: "[name]"
    },

};