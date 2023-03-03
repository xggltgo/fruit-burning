const jwt = require('jsonwebtoken');
const {
  insertUser,
  loginDao,
  updateUser,
  selectUserByLoginId,
} = require('../dao/sql/user');

/**
 * 处理用户注册相关逻辑
 * @param {Object} userInfo 用户信息
 */
async function register(userInfo) {
  const user = await insertUser(userInfo);
  const { loginPwd, ...rest } = user;
  return rest;
}

/**
 * 处理用户登录相关逻辑
 * @param {Object} userInfo 用户信息
 */
async function login(userInfo) {
  // token的过期时间 默认为1天
  const maxAge = userInfo.remember ? userInfo.remember * 3600 * 24 : 3600 * 24;
  // 查询用户是否存在
  const user = await loginDao(userInfo);
  if (user) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      loginId: user.loginId,
      phone: user.phone,
      avatar: user.avatar,
      cartCount: user.cartCount,
    };
    // 生成 token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    return {
      user: payload,
      token,
    };
  }
  return user;
}

/**
 * 更新用户相关信息
 * @param {Object} newUserInfo 新的用户信息
 */
async function update(newUserInfo) {
  await updateUser(newUserInfo);
  const result = await selectUserByLoginId(newUserInfo.loginId);
  if (result) {
    const _result = result;
    delete _result.loginPwd;
    return _result;
  }
  return result;
}

async function getUserByLoginId(loginId) {
  return await selectUserByLoginId(loginId);
}

module.exports = {
  register,
  login,
  update,
  getUserByLoginId,
};
