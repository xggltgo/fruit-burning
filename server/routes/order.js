const express = require('express');
const router = express.Router();
const {
  addOrder,
  modifyOrder,
  removeOrder,
  getOneOrder,
  getOrderByUserid,
  getAllOrderByPage,
} = require('../service/order');

const { formatResponse, verifyToken } = require('../utils/tools.js');
// 添加订单信息
router.post('/', async function (req, res, next) {
  const result = await addOrder(req.body);
  res.send(formatResponse(0, '', result));
});

// 删除订单信息
router.delete('/:id', async function (req, res, next) {
  await removeOrder(req.params.id);
  res.send(formatResponse(0, '', true));
});

// 修改订单信息
router.put('/:id', async function (req, res, next) {
  const result = await modifyOrder(req.params.id, req.body);
  res.send(formatResponse(0, '', result));
});

// 获取单个订单信息
router.get('/:id', async function (req, res, next) {
  const result = await getOneOrder(req.params.id);
  res.send(formatResponse(0, '', result));
});

// 根据用户id获取其所有订单信息
router.get('/', async function (req, res, next) {
  // 解析token，并将解析后的结果返回给客户端
  const { id, nickname } = verifyToken(req.get('authorization'));
  let result;
  if (nickname) {
    // 普通用户，返回指定用户的所有订单
    result = await getOrderByUserid(id);
  } else {
    // 管理员，分页返回所有订单
    result = await getAllOrderByPage(req.query);
  }
  res.send(formatResponse(0, '', result));
});

module.exports = router;
