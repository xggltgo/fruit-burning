const { getCityList, initCityList } = require("../dao/sql/address");

// 获取城市数据
async function fetchCityList() {
  return await getCityList();
}

module.exports = {
  fetchCityList,
};
