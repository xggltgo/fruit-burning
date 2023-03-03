const express = require('express');
const {
  addCart,
  removeCart,
  modifyCart,
  getCartByUserid,
  removeSomeCart,
} = require('../service/cart');
const router = express.Router();

const { formatResponse, verifyToken } = require('../utils/tools.js');
// 用户添加商品到购物车
router.post('/', async function (req, res, next) {
  const result = await addCart(req.body);
  res.send(formatResponse(0, '', result));
});

// 用户从购物车删除一个商品
router.delete('/:id', async function (req, res, next) {
  const { id } = verifyToken(req.get('authorization'));
  await removeCart(req.params.id, id);
  res.send(formatResponse(0, '', true));
});

// 批量删除购物车中记录
router.delete('/', async function (req, res, next) {
  const { id } = verifyToken(req.get('authorization'));
  await removeSomeCart(req.body.ids, id);
  res.send(formatResponse(0, '', true));
});

// 修改购物车商品信息
router.put('/:id', async function (req, res, next) {
  const result = await modifyCart(req.params.id, req.body);
  res.send(formatResponse(0, '', result));
});

// 根据用户id查询其购物车所有数据
router.get('/', async function (req, res, next) {
  const { id } = verifyToken(req.get('authorization'));
  const result = await getCartByUserid(id);
  res.send(formatResponse(0, '', result));
});

module.exports = router;
