const md5 = require('md5');
const Admin = require('../model/admin');

/**
 * 向数据库添加一个管理员
 * @param {Object} adminInfo 管理员信息
 */
async function addAdmin(adminInfo) {
  const admin = await Admin.create({
    ...adminInfo,
    loginPwd: md5(adminInfo.loginPwd), // 密码进行 md5 加密
  });
  return admin.toJSON();
}

/**
 * 通过账号密码查找一个管理员
 * @param {Object} adminInfo 管理员信息
 * @returns
 */
async function findAdmin({ loginId, loginPwd }) {
  const admin = await Admin.findOne({
    where: {
      loginId: loginId,
      loginPwd: md5(loginPwd),
    },
  });
  if (admin) {
    return admin.toJSON();
  }
  return admin;
}

/**
 * 修改管理员信息
 * @param {Object} newAdminInfo 新的管理员信息
 */
async function updateAdmin(newAdminInfo) {
  const result = await Admin.update(
    {
      ...newAdminInfo,
      loginPwd: md5(newAdminInfo.loginPwd),
    },
    {
      where: {
        loginId: newAdminInfo.loginId,
      },
    }
  );
  return result;
}

module.exports = {
  addAdmin,
  findAdmin,
  updateAdmin,
};
