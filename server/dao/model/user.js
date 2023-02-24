const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const User = sequelize.define(
  'user',
  {
    // 在这里定义模型属性
    nickname: {
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
    phone: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/static/avatar/default.png',
    },
  },
  {
    // 这是其他模型参数
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // 配置生成的表名 不为默认的复数形式
  }
);

module.exports = User;
