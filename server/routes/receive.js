const express = require('express');
const router = express.Router();
const {
  addReceive,
  modifyReceive,
  removeReceive,
  getOneReceive,
  getReceiveByUserid,
} = require('../service/receive');

const { formatResponse, verifyToken } = require('../utils/tools.js');
// 添加收货信息
router.post('/', async function (req, res, next) {
  const { id } = verifyToken(req.get('authorization'));
  const result = await addReceive({ ...req.body, userid: id });
  res.send(formatResponse(0, '', result));
});

// 删除收货信息
router.delete('/:id', async function (req, res, next) {
  await removeReceive(req.params.id);
  res.send(formatResponse(0, '', true));
});

// 修改收货信息
router.put('/:id', async function (req, res, next) {
  const result = await modifyReceive(req.params.id, req.body);
  res.send(formatResponse(0, '', result));
});

// 获取单个收货信息
router.get('/:id', async function (req, res, next) {
  const result = await getOneReceive(req.params.id);
  res.send(formatResponse(0, '', result));
});

// 根据用户id获取其所有收货信息
router.get('/', async function (req, res, next) {
  const { id } = verifyToken(req.get('authorization'));
  const result = await getReceiveByUserid(id);
  res.send(formatResponse(0, '', result));
});

module.exports = router;
