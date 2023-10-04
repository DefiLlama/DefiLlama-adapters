const { sumTokensExport } = require("../helper/sumTokens");
const axios = require("axios");

async function farmsValue() {
  const initialResult = await axios.get("https://api.onedex.app/tvs");
  const tvs = initialResult.total_tvs;
  return tvs;
}

module.exports = {
  timetravel: false,
  elrond: {
    tvl: sumTokensExport({
      owner: "erd1qqqqqqqqqqqqqpgqqz6vp9y50ep867vnr296mqf3dduh6guvmvlsu3sujc",
    }),
    staking: farmsValue,
  },
};
