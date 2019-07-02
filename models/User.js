const mongoose = require('mongoose')

const blogSchema = require('../schemas/user')

const User = mongoose.model('User', blogSchema)


module.exports = User