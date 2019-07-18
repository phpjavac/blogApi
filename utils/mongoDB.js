// 导入 mongoose 模块
const mongoose = require('mongoose');
const env = require('./envalid')

// const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(env.DB_URI, {
    dbName: env.DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB 连接成功')
});
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));