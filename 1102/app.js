var createError = require('http-errors');// 创建错误对象
var express = require('express');
var path = require('path'); // 处理路径相关
var cookieParser = require('cookie-parser'); // cookie解析
var logger = require('morgan'); // 日志

// 导入路由相关模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var openCourses = require('./routes/open-courses');

var app = express();

// 视图引擎设置
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// 设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/oc', openCourses);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;