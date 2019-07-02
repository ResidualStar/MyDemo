const mongoose = require('mongoose')

const blogSchema = require('../schemas/category')

const Category = mongoose.model('Category', blogSchema)


module.exports = Category