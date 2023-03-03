// 同步模型，初始化数据库数据
const sequelize = require('./dbConnect');
const Admin = require('./model/admin');
const User = require('./model/user');
const Category = require('./model/category');
const Product = require('./model/product');
const Cart = require('./model/cart');
const Order = require('./model/order');
const Receive = require('./model/receive');
const OrderDetail = require('./model/orderDetail');
const { addAdmin } = require('./sql/admin');

(async () => {
  connect();
  await sequelize.sync({ alter: true }); // 同步所有模型
  const adminCount = await Admin.count();
  if (adminCount === 0) {
    // 数据库需要初始化数据
    await addAdmin({
      name: '管理员',
      loginId: 'admin',
      loginPwd: '123456',
    });
    console.log('初始化管理员数据完毕...');
  }
  console.log('数据库数据准备完毕...');
})();

// 处理表间的关联
function connect() {
  // 商品类型与商品的 一对多关系
  Category.hasMany(Product, {
    foreignKey: 'categoryid',
  });
  Product.belongsTo(Category, {
    foreignKey: 'categoryid',
  });

  // 购物车与用户之间的一对一关系
  User.hasOne(Cart, {
    foreignKey: 'userid',
  });
  Cart.belongsTo(Cart, {
    foreignKey: 'userid',
  });

  // 商品与购物车之间的 多对多关系
  Product.hasMany(Cart, {
    foreignKey: 'productid',
  });
  Cart.belongsTo(Product, {
    foreignKey: 'productid',
  });

  // Product.belongsToMany(Cart, { through: 'cartDetail' });
  // Cart.belongsToMany(Product, { through: 'cartDetail' });

  // 用户与订单的 一对多关系
  User.hasMany(Order, {
    foreignKey: 'userid',
  });
  Order.belongsTo(User, {
    foreignKey: 'userid',
  });

  // 商品与订单的 多对多关系
  Product.belongsToMany(Order, {
    through: OrderDetail,
    foreignKey: 'productid',
  });
  Order.belongsToMany(Product, { through: OrderDetail, foreignKey: 'orderid' });

  // 订单与收货信息之间的 一对一关系
  Receive.hasOne(Order, {
    foreignKey: 'receiveid',
  });
  Order.belongsTo(Receive, {
    foreignKey: 'receiveid',
  });

  // 用户与收货信息之间的 一对多关系
  User.hasMany(Receive, {
    foreignKey: 'userid',
  });
  Receive.belongsTo(User, {
    foreignKey: 'userid',
  });
}
