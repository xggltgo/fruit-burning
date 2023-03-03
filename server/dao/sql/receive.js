const Receive = require('../model/receive');

/**
 * 添加一个收货信息到数据库
 * @param {Object} receiveInfo 收货信息
 */
async function createReceive(receiveInfo) {
  const result = await Receive.create(receiveInfo);
  return result.toJSON();
}

/**
 * 从数据库删除一个收货信息
 * @param {Number} id 收货信息id
 */
async function deleteReceive(id) {
  //   const { count } = await selectOnereceive(id);
  await Receive.destroy({
    where: {
      id,
    },
  });
  //   return count;
}
/**
 * 从数据库修改一个收货信息
 * @param {Number} id 收货信息id
 * @param {Object} receiveInfo 收货信息信息
 */
async function updateReceive(id, receiveInfo) {
  await Receive.update(receiveInfo, {
    where: {
      id,
    },
  });
  return await selectOneReceive(id);
}

/**
 * 从数据库查询一个收货信息
 * @param {Number} id 收货信息id
 */
async function selectOneReceive(id) {
  const result = await Receive.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
}

/**
 * 根据用户id获取其所有收货信息
 * @param {Number} userid 用户id
 */
async function selectReceiveByUserid(userid) {
  const result = await Receive.findAll({
    where: {
      userid,
    },
    order: [['isDefault', 'DESC']],
  });
  return JSON.parse(JSON.stringify(result));
}

/**
 * 清除数据库中的默认收货地址
 */
async function initDefaultReceive(userid) {
  const result = await Receive.update(
    { isDefault: false },
    {
      where: {
        userid,
        isDefault: true,
      },
    }
  );
  return result;
}

module.exports = {
  createReceive,
  deleteReceive,
  updateReceive,
  selectOneReceive,
  selectReceiveByUserid,
  initDefaultReceive,
};
