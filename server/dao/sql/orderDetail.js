const OrderDetail = require('../model/orderDetail');
const Product = require('../model/product');

/**
 * 添加一个订单详情到数据库
 * @param {Object} orderDetailInfo 订单详情信息
 */
async function createOrderDetail(orderDetailInfo) {
  const result = await OrderDetail.create(orderDetailInfo);
  return result.toJSON();
}

/**
 * 从数据库删除一个订单对应的所有订单详情记录
 * @param {Number} orderid 订单id
 */
async function deleteOrderDetailByOrderid(orderid) {
  await OrderDetail.destroy({
    where: {
      orderid,
    },
  });
  //   return count;
}
/**
 * 从数据库修改一个订单详情
 * @param {Number} id 订单详情id
 * @param {Object} orderDetailInfo 订单详情信息
 */
async function updateorderDetail(id, orderDetailInfo) {
  await orderDetail.update(orderDetailInfo, {
    where: {
      id,
    },
  });
  return await selectOneorderDetail(id);
}

/**
 * 从数据库查询一个订单对应的所有商品信息
 * @param {Number} orderid 订单id
 */
async function selectOneOrderDetail(orderid) {
  const result = await OrderDetail.findAll({
    where: {
      orderid,
    },
  });
  return JSON.parse(JSON.stringify(result));
}

/**
 * 根据用户id获取其所有订单详情
 * @param {Number} userid 用户id
 */
async function selectorderDetailByUserid(userid) {
  const result = await orderDetail.findAll({
    where: {
      userid,
    },
    include: {
      model: Product,
      as: 'productInfo',
    },
    attributes: {
      exclude: ['productid'],
    },
  });
  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  createOrderDetail,
  deleteOrderDetailByOrderid,
  updateorderDetail,
  selectOneOrderDetail,
  selectorderDetailByUserid,
};
