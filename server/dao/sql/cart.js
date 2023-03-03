const Cart = require('../model/cart');
const Product = require('../model/product');

/**
 * 用户添加一个商品到购物车
 * @param {Object} cartInfo 购物车信息
 */
async function createCart(cartInfo) {
  const result = await Cart.create(cartInfo);
  return result.toJSON();
}

/**
 * 用户从购物车删除一个商品
 * @param {Number} id 商品id
 */
async function deleteCart(id) {
  //   const { count } = await selectOnecart(id);
  await Cart.destroy({
    where: {
      id,
    },
  });
  //   return count;
}

/**
 * 修改购物车商品信息
 * @param {Number} id 购物车id
 * @param {Object} cartInfo 购物车信息
 */
async function updateCart(id, cartInfo) {
  await Cart.update(cartInfo, {
    where: {
      id,
    },
  });
  return await selectOneCart(id);
}

/**
 * 从数据库查询一个购物车数据
 * @param {Number} id 购物车id
 */
async function selectOneCart(id) {
  const result = await Cart.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
}

/**
 * 根据用户id查询其购物车所有数据
 * @param {Number} userid 用户id
 */
async function selectCartByUserid(userid) {
  const result = await Cart.findAll({
    where: {
      userid,
    },
    include: {
      model: Product,
    },
    attributes: {
      exclude: ['userid', 'productid'],
    },
  });
  return JSON.parse(JSON.stringify(result));
}

async function selectCartByUseridAndProductid(userid, productid) {
  const result = await Cart.findOne({
    where: {
      userid,
      productid,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
}

module.exports = {
  createCart,
  deleteCart,
  updateCart,
  selectOneCart,
  selectCartByUserid,
  selectCartByUseridAndProductid,
};
