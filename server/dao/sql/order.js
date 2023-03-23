const Order = require('../model/order');
const Product = require('../model/product');
const Receive = require('../model/receive');
const { Op } = require('sequelize');

/**
 * 添加一个订单到数据库
 * @param {Object} orderInfo 订单信息
 */
async function createOrder(orderInfo) {
  const result = await Order.create(orderInfo);
  return result.toJSON();
}

/**
 * 从数据库删除一个订单
 * @param {Number} id 订单id
 */
async function deleteOrder(id) {
  //   const { count } = await selectOneorder(id);
  await Order.destroy({
    where: {
      id,
    },
  });
  //   return count;
}
/**
 * 从数据库修改一个订单
 * @param {Number} id 订单id
 * @param {Object} orderInfo 订单信息
 */
async function updateOrder(id, orderInfo) {
  await Order.update(orderInfo, {
    where: {
      id,
    },
  });
  return await selectOneOrder(id);
}

/**
 * 从数据库查询一个订单
 * @param {Number} id 订单id
 */
async function selectOneOrder(id) {
  const result = await Order.findByPk(id, {
    include: {
      model: Product,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return null;
}

/**
 * 根据用户id获取其所有订单
 * @param {Number} userid 用户id
 */
async function selectOrderByUserid(userid) {
  const result = await Order.findAll({
    where: {
      userid,
    },
    include: {
      model: Product,
    },
    order: [['createTime', 'DESC']],
  });
  return JSON.parse(JSON.stringify(result));
}

/**
 * 根据收货信息id获取其所有订单
 * @param {Number} receiveid 用户id
 */
async function selectOrderByReceiveid(receiveid) {
  const result = await Order.findAll({
    where: {
      receiveid,
      [Op.or]: [{ status: 1 }, { status: 2 }, { status: 3 }],
    },
  });
  return JSON.parse(JSON.stringify(result));
}

/**
 * 分页获取所有订单
 * @param {Object} param0 {page: number,limit: number}
 * @returns
 */
async function selectAllOrderByPage({ page = 1, limit = 10, status }) {
  // if (+status) {
  //   where.status = +status;
  // }
  const result = await Order.findAndCountAll({
    distinct: true,
    offset: (+page - 1) * +limit,
    limit: +limit,
    include: [
      {
        model: Product,
      },
      {
        model: Receive,
      },
    ],
    order: [['createTime', 'DESC']],
  });

  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  selectOneOrder,
  selectOrderByUserid,
  selectOrderByReceiveid,
  selectAllOrderByPage,
};
