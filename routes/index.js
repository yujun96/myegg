module.exports ={
  'get /':async app =>{
     app.ctx.body = '首页'
  },
  'get /detail':async app =>{
      app.ctx.body = '首页详情'
  },
}