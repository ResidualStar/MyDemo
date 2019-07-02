const mongoose = require('mongoose')

const Schema = mongoose.Schema
    // 分类 
const blogSchema = new Schema({
    categoryName: String,
    ctime: {
        type: Date,
        default: new Date()
    }
})

module.exports = blogSchema