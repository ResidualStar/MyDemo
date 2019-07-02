const mongoose = require('mongoose')

const blogSchema = require('../schemas/content')

const Content = mongoose.model('Content', blogSchema)


module.exports = Content