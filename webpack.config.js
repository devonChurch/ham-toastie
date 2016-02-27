var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname + '/src',
    devtool: 'source-map',
    entry: './entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: 'index.html' }
        ]),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include:  __dirname + '/src/js'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss?browsers=last 2 versions!sass')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', // Automatically generates source maps without the sourceMaps config
                query: {
                    presets: ['es2015']
                }
            }
        ],
        postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: false
    }
};
