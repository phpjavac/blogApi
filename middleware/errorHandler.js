
var createError = require('http-errors'); 
 module.exports = function(app){
// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function(req, res, next) {
    next(createError(404));
 });
 // error handler
 // 错误处理器
 app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // 设置 locals，只在开发环境提供错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
 
    // render the error page
    // 渲染出错页面
    res.status(err.status || 500);
    res.render('error');
 });
  };