const express = require('express')

const router = express.Router()

const User = require('../models/User')

const Category = require('../models/Category')

const Content = require('../models/Content')

// 注册
router.post('/enter', (req, res, next) => {
    let user = req.body.user
    let pass = req.body.pass
    User.findOne({ user }).then(data => {
        if (data) return res.json({ msg: '用户名已存在', code: 0 })
        else {
            let users = new User({ user, pass })
            users.save().then(data => {
                if (data) return res.json({ msg: '注册成功', code: 1 })
                else res.json({ msg: '数据库异常', code: 0 })
            })
        }

    })
})

// 登入
router.post('/login', (req, res, next) => {
    let user = req.body.user
    let pass = req.body.pass
    User.find({ user, pass }).then(data => {
        // console.log(data);

        if (data.toString()) {
            req.cookies.set('userName', JSON.stringify(data[0]))
                // req.session.userName = JSON.stringify(data[0])
            res.json({ msg: '登入成功', code: 1 })
            return
        } else res.json({ msg: '用户名或密码错误', code: 0 })

    })
})

// 查詢users 
router.post('/user/find', (req, res) => {
    let _id = req.body.id
    User.find({ _id }).then(data => {
        res.json(data)
    })
})

// 退出登入 
router.get('/logout', (req, res, next) => {
    req.cookies.set('userName', null)
    res.json({ msg: '退出成功', code: 1 })
})

// 查询users表
// skip() 忽略的条数 
let userPage = 0
router.get('/find', (req, res) => {
    userPage++
    userPage = req.query.page || userPage
    let limit = 2
    let del = (userPage - 1) * 2
        // console.log(page)
    User.find().limit(limit).skip(del).then(data => {
        res.json([userPage, data])
    })
})

// router.get('/del', (req, res) => {
//     User.remove({ _id: '5d14308cc50a56306c67bce2' }).then(data => {
//         res.json(data)
//     })
// })

// 查询users表数据总数
router.get('/findAll', (req, res) => {
    User.find().count().then(data => {
        res.json(data)
    })
})

let page = 0

// 查询category表
// skip() 忽略的条数
router.get('/category/find', (req, res) => {
    page++
    page = req.query.page || page
        // console.log(req.query.page)
    let limit = 2
    let del = (page - 1) * 2
        // console.log(page)
    Category.find().limit(limit).skip(del).then(data => {
        // console.log(page)
        res.json([page, data])
    })
})

// 查询category表数据总数
router.get('/category/findAllLength', (req, res) => {
    Category.find().count().then(data => {
        res.json(data)
    })
})

router.get('/category/findAll', (req, res) => {
    let id = req.query.id || null
        // console.log(id)
    if (id) {
        Category.find({ _id: id }).then(data => {
            res.json(data)
        })
        return
    }
    Category.find().then(data => {
        res.json(data)
    })
})


// 新增分类
router.post('/category/add', (req, res, next) => {
    let categoryName = req.body.categoryName
    User.findOne({ categoryName }).then(data => {
        if (data) return res.json({ msg: '用户名已存在', code: 0 })
        else {
            let category = new Category({ categoryName })
            category.save().then(data => {
                if (data) return res.json({ msg: '注册成功', code: 1 })
                else res.json({ msg: '数据库异常', code: 0 })
            })
        }

    })
})

// 修改分类数据
router.post('/category/updata', (req, res, next) => {
    let categoryName = req.body.categoryName
    let _id = req.body.id
    Category.findOne({ categoryName }).count().then(data => {
        console.log(data)
        if (data > 0) return res.json({ code: 0, msg: '分类已存在' })
        else {
            Category.findByIdAndUpdate(_id, { categoryName }).then(data => {
                res.json({ code: 1, msg: '修改成功' })
            })
        }

    })
})

// 刪除分類
router.get('/category/del', (req, res) => {
    let _id = req.query._id
    Category.remove({ _id }).then(data => {
        res.json({ code: 1, msg: '刪除成功' })
    })
})

// 内容管理
// 增加内容
router.post('/content/add', (req, res) => {
    let category = req.body.category
    let title = req.body.title
    let description = req.body.description
    let content = req.body.content
    let id = req.body.id
    User.find({ _id: id }).then(data => {
        data = data[0].user
        new Content({ category, title, description, content, user: data }).save().then(data => {
            res.json(data)
        })
    })

})

// 查询内容
let contentPage = 0
router.get('/content/find', (req, res) => {
    contentPage++
    contentPage = req.query.page || contentPage
    let limit = 2
    let del = (contentPage - 1) * 2
        // console.log(page)
    Content.find().limit(limit).skip(del).then(data => {
        res.json([contentPage, data])
    })
})

// 查询content表数据总数
router.get('/content/findAllLength', (req, res) => {
    Content.find().count().then(data => {
        res.json(data)
    })
})

// 修改分类数据
router.post('/content/updata', (req, res, next) => {
    let category = req.body.category
    let title = req.body.title
    let description = req.body.description
    let content = req.body.content
    let _id = req.body.id
    Content.findByIdAndUpdate(_id, { category, title, description, content }).then(data => {
        res.json({ code: 1, msg: '修改成功' })
    })
})

router.get('/content/findAll', (req, res) => {
    let id = req.query.id || null
        // console.log(id)
    if (id) {
        Content.find({ _id: id }).then(data => {
            res.json(data)
        })
        return
    }
    Content.find().then(data => {
        res.json(data)
    })
})

// 刪除内容
router.get('/content/del', (req, res) => {
    let _id = req.query._id
    Content.remove({ _id }).then(data => {
        res.json({ code: 1, msg: '修改成功' })
    })
})

module.exports = router