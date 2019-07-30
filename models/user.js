// 引入 mongoose 
const mongoose = require('mongoose')

// 建立用户表
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    article: {
        type: Number,
        default: 0
    },
    registration: {
        type: String,
        default: new Date().getTime()
    }
},{versionKey: false})

// 建立用户数据库模型
module.exports = mongoose.model('User', UserSchema)