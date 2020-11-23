const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const { type } = require('os')

// 用于加载目录
function load(dir,cb){
    // 拿到目录的绝对地址
  const dirPath = path.resolve(__dirname,dir)
  // 读取文件夹
   const files = fs.readdirSync(dirPath)
   files.forEach((filename)=>{
        // 去掉文件后缀，记录下文件名
        filename = filename.replace('.js','')
        // 加载文件内容
        const file = require(dirPath+ '/'+filename)
        //  文件名    文件内容
        cb(filename,file)
    }) 
}
//  初始化路由
function initRouter(app) {
   const router = new Router()
   load('routes',(filename, file) => {
    //  判断routes里面的文件名是不是index，如果是的，就是/ 。如果不是就是当前文件名
    const prefix = filename === 'index'? '' : `/${filename}`
    //  解析file文件的内容

    // 要对file进行判断。有可能是函数。也有可能是对象
    file = typeof file === 'function'? file(app) : file

    // 由于文件是一个对象，所以拿到文件对象，取对应的key值
    Object.keys(file).forEach((key) => {
    //   对key值进行解析
    const [method,path] = key.split(' ')
    // 对路由进行注册
    router[method](prefix + path, async(ctx)=>{
        app.ctx = ctx
        await file[key](app)
    })
    })
})
   return router 
}


function initController(app) {
    //  根据名字进行分组
    const controllers = {}
    load('controller',(filename,controller)=>{

        controllers[filename] = controller(app)
    })
    return controllers
 }
 function initService() {
    const services = {}
    load('service',(filename,service)=>{
        services[filename] = service
    })
    return services
}



module.exports = {initRouter,initController, initService}


