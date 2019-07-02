const mongoose = require('mongoose')

const blogSchema = require('../schemas/comment')

const Comment = mongoose.model('Comment', blogSchema)


module.exports = Comment