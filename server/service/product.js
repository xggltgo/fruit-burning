const {
  createProduct,
  deleteProduct,
  updateProduct,
  selectOneProduct,
  selectProductByPage,
} = require('../dao/sql/product');
const { updateCategoryCount } = require('../dao/sql/category');

// 添加商品
async function addProduct(productInfo) {
  // 对应分类 count 数量+1
  await updateCategoryCount(productInfo.categoryid, 1);
  return await createProduct({
    ...productInfo,
    createDate: Date.now(),
  });
}

// 删除商品
async function removeProduct(id) {
  // 对应分类 count 数量-1
  const { categoryid } = await selectOneProduct(id);
  await updateCategoryCount(categoryid, -1);
  return await deleteProduct(id);
}

// 修改商品
async function modifyProduct(id, productInfo) {
  // 如果修改了商品的分类，则商品原分类count-1，商品新分类count+1
  const { categoryid: originCategoryid } = await selectOneProduct(id);
  if (originCategoryid !== productInfo.categoryid && originCategoryid) {
    await updateCategoryCount(originCategoryid, -1);
    await updateCategoryCount(productInfo.categoryid, 1);
  }
  return await updateProduct(id, productInfo);
}

// 获取单个商品
async function getOneProduct(id) {
  return await selectOneProduct(id);
}

// 分页获取商品
async function getProductByPage(pageInfo) {
  const { count, rows } = await selectProductByPage(pageInfo);
  return {
    total: count,
    productList: rows,
  };
}

module.exports = {
  addProduct,
  removeProduct,
  modifyProduct,
  getOneProduct,
  getProductByPage,
};
