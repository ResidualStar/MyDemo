const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    // console.log(req.userInfo)
    if (req.userInfo.isAdmin) {
        res.redirect(`http://127.0.0.1:8080/${req.userInfo._id}`)
        return
    }
    res.render('error/forbid.html')
})

module.exports = router