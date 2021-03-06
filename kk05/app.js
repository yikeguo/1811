var createError = require('http-errors');// 创建错误对象
var express = require('express');
var path = require('path'); // 处理路径相关
var cookieParser = require('cookie-parser'); // cookie解析
var logger = require('morgan'); // 日志

const helper = require('./helpers');
// const cors = require('cors');

// 导出自定义中间件
const {initLocals} = require('./middleware');

// 导入路由相关模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var openCourses = require('./routes/open-courses');
var vipCourse = require('./routes/vip-course');
var adminRouter = require('./routes/admin');
var codeRouter = require('./routes/api/code');


var app = express();

// 视图引擎设置
// console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 应用中间件
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(logger('dev'));//日志
app.use(express.json());//获取ajax传递json
app.use(express.urlencoded({extended: false}));//解析url参数
app.use(cookieParser('secret'));//cookie解析
const session = require('express-session');
const Store = require('express-mysql-session')(session);
const {pool} = require('./models/db');
const store = new Store(null, pool);
app.use(session({
    store,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 7 * 24 * 3600 * 1000}
}))

const history = require('connect-history-api-fallback');
app.use(history());
// 设置静态目录
app.use(express.static(path.join(__dirname, 'public'),{
    maxAge: 86400
}));

// 注册自定义中间件
app.use(initLocals)

const compression = require('compression');
app.use(compression());

// 路由注册
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/open-courses', openCourses);
app.use('/vip-course', vipCourse);
app.use('/admin', adminRouter);
app.use('/api/code', codeRouter);
app.use('/api/users',  require('./routes/api/users'));
app.use('/api/courses',  require('./routes/api/course'));

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
