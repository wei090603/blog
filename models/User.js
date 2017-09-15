const mongoose = require('mongoose');

//表结构
const userSchemas = require('../schemas/user');

//数据
let User = mongoose.model('user', userSchemas);

module.exports = User;

