let mongoose = require('mongoose');

//表结构
module.exports = new mongoose.Schema({
      username: String,
      password: String,
      tel: String,
      isAdmin: {
            type: Boolean,
            default: false
      }
})