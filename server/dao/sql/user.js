const md5 = require('md5');
const User = require('../model/user');

/**
 * 向数据库添加一个用户
 * @param {Object} userInfo 用户信息
 */
async function insertUser(userInfo) {
  const user = await User.create({
    ...userInfo,
    loginPwd: md5(userInfo.loginPwd), // 密码进行md5加密
  });
  return user.toJSON();
}

/**
 * 通过账号密码查找用户
 * @param {Object} userInfo 用户信息
 * @returns
 */
async function loginDao({ loginId, loginPwd }) {
  const user = await User.findOne({
    where: {
      loginId,
      loginPwd: md5(loginPwd),
    },
  });
  if (user) {
    return user.toJSON();
  }
  return user;
}

async function selectUserByLoginId(loginId) {
  const user = await User.findOne({
    where: {
      loginId,
    },
  });
  if (user) {
    return user.toJSON();
  }
  return user;
}

/**
 * 修改用户信息
 * @param {Object} newUserInfo 新的用户信息
 */
async function updateUser(newUserInfo) {
  const result = await User.update(newUserInfo, {
    where: {
      loginId: newUserInfo.loginId,
    },
  });
  return result;
}

module.exports = {
  insertUser,
  loginDao,
  updateUser,
  selectUserByLoginId,
};
