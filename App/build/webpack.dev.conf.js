// created by Spades <spadesge@gmail.com> on 18/3/13

process.env.NODE_ENV = 'development'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')

const baseWebpackConf = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')


const devWebpackConf = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        contentBase: utils.resolve('../static'),
        hot: true,
        open: true,
        publicPath: '/'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCss: config.dev.usePostCss
        })
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
    ]
}

module.exports = WebpackMerge(baseWebpackConf, devWebpackConf)