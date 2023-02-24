// 同步模型，初始化数据库数据
const sequelize = require('./dbConnect');
const Admin = require('./model/admin');
const User = require('./model/user');
const Category = require('./model/category');
const Product = require('./model/product');
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
}
