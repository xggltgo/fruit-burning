const jwt = require('jsonwebtoken');

const { findAdmin, updateAdmin } = require('../dao/sql/admin');
const { ValidationError } = require('../utils/errors');
const { formatResponse } = require('../utils/tools');

/**
 * 处理管理员登录相关逻辑
 * @param {Object} adminInfo 管理员信息
 */
async function login(adminInfo) {
  // token 的过期时间 默认为 1 天
  const maxAge = adminInfo.remember
    ? adminInfo.remember * 3600 * 24
    : 3600 * 24;
  // 查询管理员是否存在
  const admin = await findAdmin(adminInfo);
  if (admin) {
    const payload = { id: admin.id, name: admin.name, loginId: admin.loginId };
    // 生成 token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    return {
      admin: payload,
      token,
    };
  }
  return admin;
}

/**
 * 更新管理员相关信息
 * @param {Object} newAdminInfo 新的管理员信息
 */
async function update({ name, loginId, loginPwd, oldLoginPwd }) {
  // 查询旧密码是否正确
  const admin = await findAdmin({
    loginId: loginId,
    loginPwd: oldLoginPwd,
  });
  if (admin) {
    // 旧密码正确 更新管理员信息
    await updateAdmin({
      name,
      loginId,
      loginPwd,
    });
    return formatResponse(0, '', {
      id: admin.id,
      name,
      loginId,
    });
  } else {
    throw new ValidationError('旧密码不正确');
  }
}

module.exports = {
  login,
  update,
};
