const mongoose = require('mongoose')

const Schema = mongoose.Schema
    // 分类 
const blogSchema = new Schema({
    category: {
        type: String,
        ref: 'Content' // 關連列表 
    },
    title: String,
    user: {
        type: String, //mongoose.Schema.Types.ObjectId,
        ref: 'User' // 
    },
    addTime: {
        type: Date,
        default: new Date
    },
    // 點擊量
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
})

module.exports = blogSchema