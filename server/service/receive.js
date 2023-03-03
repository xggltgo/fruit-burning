const {
  createReceive,
  updateReceive,
  deleteReceive,
  selectOneReceive,
  selectReceiveByUserid,
  initDefaultReceive,
} = require('../dao/sql/receive');
const { selectOrderByReceiveid } = require('../dao/sql/order');

// 添加收货信息
async function addReceive(receiveInfo) {
  if (receiveInfo.isDefault) {
    // 取消数据库中当前的默认地址
    await initDefaultReceive(receiveInfo.userid);
  }
  return await createReceive(receiveInfo);
}

// 删除收货信息
async function removeReceive(id) {
  return await deleteReceive(id);
}

// 修改收货信息
async function modifyReceive(id, receiveInfo) {
  if (receiveInfo.isDefault) {
    // 取消数据库中当前的默认地址
    await initDefaultReceive(receiveInfo.userid);
  }
  return await updateReceive(id, receiveInfo);
}

// 获取单个收货信息
async function getOneReceive(id) {
  // 判断当前收货信息是否有订单正在使用
  const orderList = await selectOrderByReceiveid(id);
  const result = await selectOneReceive(id);
  return {
    ...result,
    using: !!orderList.length,
  };
}

/**
 * 根据用户id获取其所有收货信息
 * @param {Number} userid 用户id
 */
async function getReceiveByUserid(userid) {
  return await selectReceiveByUserid(userid);
}

module.exports = {
  addReceive,
  removeReceive,
  modifyReceive,
  getOneReceive,
  getReceiveByUserid,
};
