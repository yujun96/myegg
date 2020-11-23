module.exports = app => ({
    info:async ctx =>{
      const name  = await app.$service.user.getName()
       app.ctx.body = name
    },
    index:async ctx =>{
        app.ctx.body = 'user首页Controller'
     }
})