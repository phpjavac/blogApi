// 引入 mongoose 
const mongoose = require('mongoose')

// 建立用户表
const WorkingHoursSchema = new mongoose.Schema({
    January: {
        type: Array
    },
    February: {
        type: Array
    },
    March: {
        type: Array
    },
    April: {
        type: Array
    },
    May: {
        type: Array
    },
    June: {
        type: Array
    },
    July: {
        type: Array
    },
    August: {
        type: Array
    },
    September: {
        type: Array
    },
    October: {
        type: Array
    },
    November: {
        type: Array
    },
    December: {
        type: Array
    },

}, {
    versionKey: false
})

// 建立用户数据库模型
module.exports = mongoose.model('WorkingHours', WorkingHoursSchema)