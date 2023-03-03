const { async } = require('validate.js');
const {
  createCart,
  deleteCart,
  updateCart,
  selectCartByUserid,
  selectCartByUseridAndProductid,
} = require('../dao/sql/cart');
const { updateUserCartCount } = require('../dao/sql/user');

// 用户添加一个商品到购物车
async function addCart(cartInfo) {
  // 判断购物车中是否已经有对应的商品，如果有仅更新其数量即可，没有才创建一个新的购物车
  const result = await selectCartByUseridAndProductid(
    cartInfo.userid,
    cartInfo.productid
  );
  if (result) {
    // 更新其quantity
    return await updateCart(result.id, {
      quantity: result.quantity + cartInfo.quantity,
    });
  } else {
    // 对应用户 cartCount 数量+1
    await updateUserCartCount(cartInfo.userid, 1);
    return await createCart({
      ...cartInfo,
      createDate: Date.now() + '',
    });
  }
}

// 用户从购物车删除一个商品
async function removeCart(id, userid) {
  // 对应用户 cartCount 数量-1
  await updateUserCartCount(userid, -1);
  return await deleteCart(id);
}

// 批量删除购物车中记录
async function removeSomeCart(ids, userid) {
  await updateUserCartCount(userid, -ids.length);
  ids.forEach((id) => {
    deleteCart(id);
  });
}

// 修改购物车商品信息
async function modifyCart(id, cartInfo) {
  return await updateCart(id, cartInfo);
}

// 根据用户id查询其购物车所有数据
async function getCartByUserid(userid) {
  return await selectCartByUserid(userid);
}

module.exports = {
  addCart,
  removeCart,
  removeSomeCart,
  modifyCart,
  getCartByUserid,
};
