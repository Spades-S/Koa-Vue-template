// created by Spades <spadesge@gmail.com> on 18/3/13

function setRouters(router) {
    router.get('/', (ctx) => {
       return  ctx.render('index')
    })
}

module.exports = setRouters;