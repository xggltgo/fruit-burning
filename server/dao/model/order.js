const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Order = sequelize.define(
  'order',
  {
    // 实付金额
    payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // 付款类型 微信(0) or 支付宝(1)
    payType: {
      type: DataTypes.BOOLEAN,
    },
    // 订单状态 已取消（0） 未付款(1) 待发货（2） 已发货（3） 交易完成（4）
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 创建时间
    createTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 支付时间
    payTime: {
      type: DataTypes.STRING,
    },
    // 发货时间
    sendTime: {
      type: DataTypes.STRING,
    },
    // 交易完成时间
    endTime: {
      type: DataTypes.STRING,
    },
  },
  {
    // 这是其他模型参数
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // 配置生成的表名 不为默认的复数形式
  }
);

module.exports = Order;
