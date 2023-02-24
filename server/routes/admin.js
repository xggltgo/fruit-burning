const express = require('express');
const router = express.Router();

const { login, update } = require('../service/admin');
const { formatResponse, verifyToken } = require('../utils/tools');
const { ValidationError } = require('../utils/errors');

router.post('/login', async function (req, res, next) {
  // 验证验证码流程
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    throw new ValidationError('验证码错误');
  }
  // 管理员认证流程
  const result = await login(req.body);
  if (result) {
    // 登录成功
    res.setHeader('Authorization', result.token);
    res.send(formatResponse(0, '', result.admin));
  } else {
    // 账号密码错误处理
    // throw new ValidationError('账号或密码错误');
    // res.send(formatResponse(0, '', null));
  }
});

router.get('/whoami', async function (req, res, next) {
  // 解析token，并将解析后的结果返回给客户端
  const result = verifyToken(req.get('authorization'));
  res.send(
    formatResponse(0, '', {
      id: result.id,
      name: result.name,
      loginId: result.loginId,
    })
  );
});

router.put('/', async function (req, res, next) {
  const result = await update(req.body);
  res.send(result);
});

module.exports = router;
