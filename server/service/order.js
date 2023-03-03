const { async } = require('validate.js');
const {
  createOrder,
  updateOrder,
  deleteOrder,
  selectOneOrder,
  selectOrderByUserid,
} = require('../dao/sql/order');
const {
  createOrderDetail,
  deleteOrderDetailByOrderid,
} = require('../dao/sql/orderDetail');

// 添加订单信息
async function addOrder(orderInfo) {
  let { productInfo, ...rest } = orderInfo;
  // 1. 组装订单表相关数据，并添加至数据库
  const { id: orderid } = await createOrder({
    ...rest,
    createTime: Date.now(),
  });
  // 2. 组装订单详情表相关数据，并添加到数据库
  productInfo = productInfo.map(async ({ productid, productCount }) => {
    await createOrderDetail({
      orderid,
      productid,
      productCount,
    });
  });
  await Promise.all(productInfo);
  //3. 返回完整的订单信息
  return await selectOneOrder(orderid);
}

// 删除订单信息
async function removeOrder(id) {
  // 1.一并删除订单详情表中的信息
  await deleteOrderDetailByOrderid(id);
  return await deleteOrder(id);
}

// 修改订单信息
async function modifyOrder(id, orderInfo) {
  return await updateOrder(id, orderInfo);
}

// 获取单个订单信息
async function getOneOrder(id) {
  return await selectOneOrder(id);
}

/**
 * 根据用户id获取其所有订单信息
 * @param {Number} userid 用户id
 */
async function getOrderByUserid(userid) {
  return await selectOrderByUserid(userid);
}

module.exports = {
  addOrder,
  removeOrder,
  modifyOrder,
  getOneOrder,
  getOrderByUserid,
};
