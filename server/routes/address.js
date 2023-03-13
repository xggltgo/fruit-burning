const express = require("express");
const cityList = require('../utils/cityList')
const router = express.Router();

const { formatResponse } = require("../utils/tools.js");
// 获取城市数据
router.get("/", async function (req, res, next) {
  res.send(formatResponse(0, "", cityList));
});


module.exports = router;
