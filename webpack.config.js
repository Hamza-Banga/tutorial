var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        path: "./dist",
        publicPath: "./dist",
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', "stage-0", "env"]
                }
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            /*{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            }*/
        ]
    },
    plugins: [
        // new ExtractTextPlugin("css/[name].css", {
        //     allChunks: true
        // })
       /*new HtmlWebpackPlugin()*/]
};