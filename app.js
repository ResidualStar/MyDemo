const express = require('express')

// const swig = require('swig')

const template = require('express-art-template')

const path = require('path')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const Cookies = require('cookies')

const session = require('express-session')

const cors = require('cors')

const app = express()

// app.engine('html', swig.renderFile)
// app.set('views', './views')
// app.set('view engine', 'html')
//     // 开发模式下取消模板缓存
// swig.setDefaults({ cache: false })

app.use(cors())

app.engine('html', template)

app.use(session({
    secret: 'keyboard cat', // 配置加密字符串 加密时拼接字符串一起加密 
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false })) // 只要加入了这个配置 则在res中对了一个req.body属性 获取表单post数据
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.use((req, res, next) => {
    // 设置cookie
    // res.header({
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Origin": "http://127.0.0.1:8081/"
    // })
    req.cookies = new Cookies(req, res)
    if (req.cookies.get('userName')) {
        req.userInfo = JSON.parse(req.cookies.get('userName'))
    }
    // console.log(req.session.userName)
    // console.log(req.userInfo, req.cookies.get('userName'))
    next()
})

app.use('/', require('./routers/main'))
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))

app.use((req, res) => {
    res.render('error/404.html')
})

mongoose.connect('mongodb://localhost/blogs', { useNewUrlParser: true }, function(err) {
    if (err) console.log('连接失败')
    else console.log('连接成功')
})

app.listen(8081, () => {

    console.log('running...')

})