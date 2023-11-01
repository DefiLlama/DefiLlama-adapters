const { sumERC4626VaultsExport } = require('../helper/erc4626')

const config = {
  ethereum: {
    lvTokens: {
      "ampr-LP-USD": "0x3b022EdECD65b63288704a6fa33A8B9185b5096b",
    }
  }
}

Object.keys(config).forEach(chain => {
  const { lvTokens } = config[chain]
  module.exports[chain] = {
    tvl: sumERC4626VaultsExport({ vaults: Object.values(lvTokens)})
  }
})
