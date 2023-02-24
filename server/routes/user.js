const express = require('express');
const router = express.Router();

const { register, login,update } = require('../service/user');
const { formatResponse, verifyToken } = require('../utils/tools');
const { ValidationError } = require('../utils/errors');

router.post('/register', async function (req, res, next) {
  // 向数据库添加一条数据并返回
  const user = await register(req.body);
  res.send(formatResponse(user));
});

router.post('/login', async function (req, res, next) {
  // 用户认证流程
  const result = await login(req.body);

  if (result) {
    // 登录成功
    res.setHeader('Authorization', result.token);
    res.send(formatResponse(0, '', result.user));
  } else {
    // 账号密码错误处理
    // throw new ValidationError('账号或密码错误');
    // res.send(formatResponse(0, '', null));
  }
});

router.get('/whoami', async function (req, res, next) {
  // 解析token，并将解析后的结果返回给客户端
  const result = verifyToken(req.get('authorization'));
  console.log(result);
  res.send(
    formatResponse(0, '', {
      id: result.id,
      nickname: result.nickname,
      loginId: result.loginId,
      phone: result.phone,
      avatar: result.avatar,
    })
  );
});

router.put('/', async function (req, res, next) {
  const result = await update(req.body);
  res.send(result);
});

module.exports = router;
