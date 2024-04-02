const { staking } = require("../helper/staking");

module.exports = {
  arbitrum: {
    tvl: () => ({}),
    staking: staking("0xf75fb73fd1bccd23ce2389169674ce375b43b7a6", "0xe46C5eA6Da584507eAF8dB2F3F57d7F578192e13"),
  },
}
