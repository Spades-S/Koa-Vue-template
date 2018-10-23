// created by Spades <spadesge@gmail.com> on 18/3/13

const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    distDir: resolve('../dist'),
    build: {
        cssSourceMap: true,
        usePostCss: false,
    },
    dev: {
        cssSourceMap: true,
        usePostCss: false
    },
    publicPath: '/',
    styleLang: 'scss'
}