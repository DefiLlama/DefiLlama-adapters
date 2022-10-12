const { getUniTVL } = require("../helper/unknownTokens");
const { stakings } = require("../helper/staking");
const sdk = require('@defillama/sdk')

const constantProductFactory = "0xd6715A8be3944ec72738F0BFDC739d48C3c29349";
const stableSwapFactory = "0xC6B7ee49D386bAe4FD501F2d2f8d18828F1f6285";
const factories = [constantProductFactory, stableSwapFactory].map(factory => getUniTVL({
  factory,
  chain: 'bsc',
  useDefaultCoreAssets: true
}))

const NMX = "0xd32d01a43c869edcd1117c640fbdcfcfd97d9d65"

const stakingPools = [
  // Staking pool
  "0xdbf1b10fe3e05397cd454163f6f1ed0c1181c3b3",
]

module.exports = {
  bsc: {
    staking: stakings(stakingPools, NMX, 'bsc'),
    tvl: sdk.util.sumChainTvls(factories),
  },
};