const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Cart = sequelize.define(
  'cart',
  {
    // 商品数量
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // true（1）表示勾选 false（0）表示未勾选
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    createDate: {
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

module.exports = Cart;
