const express = require('express')

const Content = require('../models/Content')

const Comment = require('../models/Comment')

const router = express.Router()

router.get('/', (req, res, next) => {

    res.render('main/index.html', req.userInfo)

})

router.post('/content/find', (req, res, next) => {
    let page = req.body.page || 1
    let limit = 3
    let del = (page - 1) * 3
    Content.find().limit(limit).skip(del).then(data => {
        res.send({ data, page })
    })

})

router.get('/content/findLength', (req, res, next) => {

    Content.find().count().then(data => {
        res.json(data)
    })
})

router.post('/content/findBycategory', (req, res, next) => {
    let page = req.body.page || 1
    let limit = 3
    let del = (page - 1) * 3
    let category = req.body.category
    Content.find({ category }).limit(limit).skip(del).then(data => {
        res.json({ data, page })
    })

})

router.post('/content/findBycategoryLength', (req, res, next) => {
    let category = req.body.category
    Content.find({ category }).count().then(data => {
        res.json(data)
    })
})

router.get('/content/findById', (req, res, next) => {

    res.render('main/ready.html', req.userInfo)
})

// 查詢登入狀態 
router.get('/content/user', (req, res, next) => {

    res.json(req.userInfo)
})

router.post('/content/findById', (req, res, next) => {
    let _id = req.body.id
    Content.find({ _id }).then(data => {
        res.json(data)
    })
})

router.get('/content/updataViews', async(req, res) => {
    let views;
    let _id = req.query.id
    await Content.find({ _id }).then(data => {
        views = ++data[0].views
    })
    await Content.findByIdAndUpdate(_id, { views }).then(data => {
        res.json({ code: 1, msg: '修改成功' })
    })
})

// Comment 評論路由 
// 增
router.post('/comment/add', (req, res) => {
    let user = req.body.user
    let comment = req.body.comment
    new Comment({ user, comment }).save().then(data => {
        res.json({ code: 1, msg: "評論成功" })
    })
})

// 分頁查詢
router.post('/comment/find', (req, res, next) => {
    let page = req.body.page || 1
    let limit = 3
    let del = (page - 1) * 3
    Comment.find().limit(limit).skip(del).then(data => {
        res.json({ data, page })
    })
})

// 評論總數查詢
router.post('/comment/findBycategoryLength', (req, res, next) => {

    Comment.find().count().then(data => {
        res.json(data)
    })

})

module.exports = router