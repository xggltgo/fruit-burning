const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
const Order = require('./order');
const Product = require('./product');

const OrderDetail = sequelize.define(
  'orderDetail',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 产品数量
    productCount: {
      type: DataTypes.INTEGER,
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

module.exports = OrderDetail;
