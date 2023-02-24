const express = require('express');
const {
  addProduct,
  modifyProduct,
  removeProduct,
  getOneProduct,
  getProductByPage,
} = require('../service/product.js');
const router = express.Router();

const { formatResponse } = require('../utils/tools.js');
// 添加商品
router.post('/', async function (req, res, next) {
  const result = await addProduct(req.body);
  res.send(formatResponse(0, '', result));
});

// 删除商品
router.delete('/:id', async function (req, res, next) {
  await removeProduct(req.params.id);
  res.send(formatResponse(0, '', true));
});

// 修改商品
router.put('/:id', async function (req, res, next) {
  const result = await modifyProduct(req.params.id, req.body);
  res.send(formatResponse(0, '', result));
});

// 获取单个商品
router.get('/:id', async function (req, res, next) {
  const result = await getOneProduct(req.params.id);
  res.send(formatResponse(0, '', result));
});

// 分页获取商品
router.get('/', async function (req, res, next) {
  const result = await getProductByPage(req.query);
  res.send(formatResponse(0, '', result));
});

module.exports = router;
