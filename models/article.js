// 引入 mongoose 
const mongoose = require('mongoose')

// 建立标签表
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
},{versionKey: false})

// 建立标签数据库模型
module.exports.Tag = mongoose.model('Tag', TagSchema)