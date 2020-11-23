module.exports = app =>  ({
    'get /':app.$ctrl.user.index, 
    'get /info':async app =>{
        app.ctx.body = '用户年龄' + app.$service.user.getAge()
    }
})