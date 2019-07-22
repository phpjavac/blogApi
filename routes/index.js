module.exports = function(app){
  // 分发user模块，比如用户的注册和登录请求业务逻辑将会在/api/user.js中实现
  var user = require('../api/user');
  var tool = require('../api/utils/tool')
  app.use('/api/user',user);
  app.use('/api/tool',tool);
};