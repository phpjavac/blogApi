var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var User = require('../models/user')
const { MD5_SUFFIX, md5, secretKey } = require('../utils/constant');
var user = new User();

// 注册
router.post('/register', async (req, res) => {
  if (!req.body.code || !req.body.password) {
    res.json(400, { message: "请输入账号或者密码！", code: 3 });
  }
  User.find({ code: req.body.code }, (err, docs) => {
    if (docs.length > 0) {
      res.send({ message: '用户名已存在' })
    } else {
      user.username = req.body.username;
      user.code = req.body.code
      user.password = req.body.password;
      user.save(function (err) {
        if (err) {
          res.send(err);
        };
        res.json({ message: '注册成功' });
      })
    }
  })

})

// 登录接口


router.post('/login', function (req, res) {
  const code = req.body.code;
  const password = req.body.password;
  const tokenObj = {
    code: req.body.code
  };
  User.find({ code: code }, function (err, users) {
    if (users.length === 0) {
      res.json(400, { message: "该用户不存在", code: 3 });
    } else if (users[0].password === password) {
      let token = jwt.sign(tokenObj, secretKey, {
        expiresIn : 60 * 60 * 24 // 授权时效24小时
  })
      res.json({ message: "登录成功", code: 0, token });
    } else if (users[0].password !== password) {
      res.json(400, { message: "密码不正确，请重新输入！", code: 3 });
    }
  });
})

// 获取用户列表
router.get('/', (req, res) => {
  const query = req.query.code ? { code: req.query.code } : {}
  User.find(query, (err, docs) => {
    if (docs.length > 0) {
      const userList = docs.map(doc => {
        return {
          username: doc.username,
          registration: doc.registration,
          article: doc.article
        }
      })
      if (query.code) {
        res.json({ message: '请求成功', data: userList[0] });
        return
      }
      res.json({ message: '请求成功', data: userList });
    } else {
      res.send(400, { message: '暂无用户' })
    }
  })
})
router.post('/login', (req, res) => {

})
module.exports = router;
