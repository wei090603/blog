const mongoose = require('mongoose');

//表结构
const blogSchemas = require('../schemas/blog');

//数据
let Blog = mongoose.model('blog', blogSchemas);

module.exports = Blog;

