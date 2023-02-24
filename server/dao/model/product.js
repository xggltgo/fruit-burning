const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Product = sequelize.define(
  'product',
  {
    // 商品名称
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 普通(-1) or 热销(0) or 新品(1)
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    // 商品价格 保留两位小数
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // 商品小图
    image_sm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 商品小图
    image_mid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 商品小图
    image_big: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 商品库存
    stock: {
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

module.exports = Product;
