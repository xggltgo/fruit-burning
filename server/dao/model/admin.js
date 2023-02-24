const {  DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Admin = sequelize.define(
  'admin',
  {
    // 在这里定义模型属性
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 这是其他模型参数
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // 配置生成的表名 不为默认的复数形式
  }
);

module.exports = Admin;
