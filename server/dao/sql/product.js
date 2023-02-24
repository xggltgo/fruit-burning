const Product = require('../model/product');
const Category = require('../model/category');

/**
 * 添加一个商品到数据库
 * @param {Object} productInfo 商品信息
 */
async function createProduct(productInfo) {
  const result = await Product.create(productInfo);
  return result.toJSON();
}

/**
 * 从数据库删除一个商品
 * @param {Number} id 商品id
 */
async function deleteProduct(id) {
  //   const { count } = await selectOneProduct(id);
  await Product.destroy({
    where: {
      id,
    },
  });
  //   return count;
}
/**
 * 从数据库修改一个商品
 * @param {Number} id 商品id
 * @param {Object} productInfo 商品信息
 */
async function updateProduct(id, productInfo) {
  await Product.update(productInfo, {
    where: {
      id,
    },
  });
  return await selectOneProduct(id);
}

/**
 * 从数据库查询一个商品
 * @param {Number} id 商品id
 */
async function selectOneProduct(id) {
  const result = await Product.findByPk(id, {
    include: {
      model: Category,
      as: 'category',
    },
  });
  if (result) {
    return result.toJSON();
  }
  return null;
}

/**
 * 从数据库查询所有商品
 */
async function selectProductByPage({
  page = 1,
  limit = 20,
  categoryid = -1,
  keyword = '',
}) {
  const where = {};
  if (+categoryid !== -1) {
    where.categoryid = categoryid;
  }
  const result = await Product.findAndCountAll({
    where,
    offset: (+page - 1) * +limit,
    limit: +limit,
  });


  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  selectOneProduct,
  selectProductByPage,
};
