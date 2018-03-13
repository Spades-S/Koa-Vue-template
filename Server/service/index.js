// created by Spades <spadesge@gmail.com> on 18/3/13

const koa = require('koa')
const Router = require('koa-router')

const config = require('../config')
const init = require('../common/init')
const setRouters = require('../router')


const app = new koa()
const router = new Router()
setRouters(router)

init(app)


app.use(require('koa-logger')())
app.use(require('koa-static')(config.staticPath, {
    maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
    gzip: config.enableCompress
}))
app.use(require('koa-body')({
    multipart: 'true'
}))

app.use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    app.listen(config.port);
    logger.info('listening on port %s, the env is %s', config.port, config.env);
    logger.debug('You can debug your app with http://127.0.0.1:%s', config.port);
}


