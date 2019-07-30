
// express-jwt中间件帮我们自动做了token的验证以及错误处理，所以一般情况下我们按照格式书写就没问题，其中unless放的就是你想要不检验token的api。
// jwt.js,token中间件
module.exports = function (app) {
    const expressJwt = require("express-jwt");
    const { secretKey } = require('../utils/constant');
    const jwtAuth = expressJwt({ secret: secretKey }).unless({ path: ["/api/article/list","/api/article/taglist","/api/user/login", "/api/user/register","/api/tool/workingday"] });
    // 所有请求过来都会进行身份验证
    app.use(jwtAuth)
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(err.status).send({ message: '认证失败，请重新登录！'});
            console.error(err);
            return;
        }
        next();
    });
};
