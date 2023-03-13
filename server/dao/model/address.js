const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Address = sequelize.define(
  'address',
  {
    // 商品数量
    data: {
      type: DataTypes.TEXT,
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

module.exports = Address;
