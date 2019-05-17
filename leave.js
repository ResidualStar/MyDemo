let express = require('express')

let router = require('./router.js')

let bodyParser = require('body-parser') // 引包

let sever = express()

sever.use(bodyParser.urlencoded({ extended: false })) // 只要加入了这个配置 则在res中对了一个res.body属性 获取表单post数据
sever.use(bodyParser.json())

sever.engine('html', require('express-art-template'))

sever.use('/node_modules/', express.static('./node_modules/'))

sever.use('/public/', express.static('./public/')) // 开放的文件就可以直接通过/public/来访问该文件目录下的文件

sever.use(router) // 将路由容器挂在至sever服务中  相当于将容器内挂载的路由重新挂载至sever服务中
    // router(sever, fs)

sever.listen(3000, function() {
    console.log('running ...');

})