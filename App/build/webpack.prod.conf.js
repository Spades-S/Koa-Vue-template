// created by Spades <spadesge@gmail.com> on 18/3/13


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')

const baseWebpackConf = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const prodWebpackConf = {
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.cssSourceMap,
            usePostCss: config.build.usePostCss,
            extract: true
        })
    },
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                parallel: true
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.cssSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
            })
        ],
        splitChunks: {
            automaticNameDelimiter: '-',
            chunks: 'all',
            minSize: 1024 * 500, // 
            maxSize: 1024 * 1000 // 
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin([config.distDir], {
            root: utils.resolve('../')
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([{
            from: utils.resolve('../static'),
            to: config.distDir,
            ignore: ['.*']
        }]),
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),

        new VueLoaderPlugin(),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin()
    ]

}



module.exports = WebpackMerge(baseWebpackConf, prodWebpackConf)