const koa = require('koa')
const {initRouter, initController, initService} = require('./loader')

class MyEgg{
    constructor() {
        this.$app = new koa()
        this.$service = initService()
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }
    start(port){
        this.$app.listen(port, () => {
            console.log('服务器启动了')
        })
    }
}

module.exports = MyEgg
