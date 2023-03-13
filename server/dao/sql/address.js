const Address = require("../model/address");

async function getCityList() {
  const result = await Address.findOne();
  if (result) {
    return result.toJSON();
  }
  return null;
}

module.exports = {
  getCityList,
};
