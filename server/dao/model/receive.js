const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Receive = sequelize.define(
  'receive',
  {
    // 收货人姓名
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 收货人电话
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 省份
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 市
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 区/县
    county: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 详细地址
    detailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // 这是其他模型参数
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // 配置生成的表名 不为默认的复数形式
  }
);

module.exports = Receive;
