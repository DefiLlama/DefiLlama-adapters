const { get } = require('../helper/http')

async function fetch() {
  const resp = await get('https://connect.tonhubapi.com/stats/staking')
  return resp.data.tvl;
}

module.exports = {
  fetch,
};
