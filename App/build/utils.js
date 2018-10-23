// created by Spades <spadesge@gmail.com> on 18/3/13

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const config = require('../config')


exports.resolve = function(dir) {
    return path.resolve(__dirname, dir)
}

exports.cssLoaders = function(options = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        var loaders = options.usePostCss ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }

    }

    switch (config.styleLang) {
        case 'css':
            return { css: generateLoaders() }
        case 'postcss':
            return { postcss: generateLoaders() }
        case 'less':
            return { less: generateLoaders('less-loader') }
        case 'sass':
            return { sass: generateLoaders('sass-loader', { indentedSyntax: true }) }
        case 'scss':
            return { scss: generateLoaders('sass-loader') }
        case 'stylus':
            return { stylus: generateLoaders('stylus-loader') }
    }
}

exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}