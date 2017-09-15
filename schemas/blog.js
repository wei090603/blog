let mongoose = require('mongoose');

//表结构
module.exports = new mongoose.Schema({
      title: String,
      description: String,
      content: String,
      date: String
})