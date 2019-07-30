// 引入 mongoose 
const mongoose = require('mongoose')

// 建立标签表
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
}, { versionKey: false })
// 建立文章表
const ArticleSchema = new mongoose.Schema({
    code: {
        type: String
    },
    title: {
        type: String
    },
    tag: {
        type: Array
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    imgurl: {
        type: String
    },
    time: {
        type: String,
        default: new Date().getTime()
    },
    state: {
        type: Boolean,
        default: true
    }
}, { versionKey: false })
// 建立标签数据库模型
module.exports.Tag = mongoose.model('Tag', TagSchema)
module.exports.Article = mongoose.model('Article', ArticleSchema)