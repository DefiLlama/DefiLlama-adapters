const { toUSDTBalances } = require("../helper/balances");
const { get } = require("../helper/http");
const ADDRESSES = require("../helper/coreAssets.json");
const { sumTokens, sumTokensExport } = require("../helper/chain/elrond");

const API_URL = "https://pulsar-money-prod.herokuapp.com/metrics/tvl";

async function tvl() {
  const data = await get(API_URL);

  const tokensAndOwners = {
    owners: ["erd1qqqqqqqqqqqqqpgq39rqpn2xvm0ykl2ccaa4h5zk5c9r647wdteswmap9l"],
    balances: [data],
  };

  return sumTokens(tokensAndOwners);
}

module.exports = {
  timetravel: false,
  elrond: {
    tvl: tvl,
  },
};
