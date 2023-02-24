var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { expressjwt: jwt } = require('express-jwt');
require('express-async-errors');
var session = require('express-session');

const {
  ForbiddenError,
  ServiceError,
  UnknownError,
} = require('./utils/errors');

// 配置环境变量
require('dotenv').config();
// 建立数据库连接
require('./dao/init');

// 导入路由中间件
var adminRouter = require('./routes/admin');
var captchaRouter = require('./routes/captcha');
var userRouter = require('./routes/user');
var uploadRouter = require('./routes/upload');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');

var app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logger('dev'));
app.use(express.json()); // ?
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// JWT认证中间件
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/api/admin/login',
      '/res/captcha',
      '/api/user/register',
      '/api/user/login',
      '/api/category',
      '/api/product',
      { url: /^\/api\/category\/\d+$/, method: 'GET' },
      { url: /^\/api\/product\/\d+$/, method: 'GET' },
    ],
  })
);

// 使用路由中间件
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/res/captcha', captchaRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  console.log('err-name', err.name);
  console.log('err-message', err.message);

  if (err.name === 'UnauthorizedError') {
    // 说明是 token 验证错误，接下来我们来抛出我们自定义的错误
    res.send(new ForbiddenError('未登录，或者登录已经过期').toResponseJSON());
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
