const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        whoami: [
            'object-assign',
            './src/index.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader',
            },
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, 
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({ mode: 'static', openAnalyzer: true }),
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devtool: 'cheap-module-source-map'
}