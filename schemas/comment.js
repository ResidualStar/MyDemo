const mongoose = require('mongoose')

const Schema = mongoose.Schema
    // 分类 
const blogSchema = new Schema({
    user: String,
    comment: String,
    commentTime: {
        type: Date,
        default: new Date()
    }
})

module.exports = blogSchema