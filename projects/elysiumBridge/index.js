const { sumTokens2 } = require('../helper/unwrapLPs')

const config = {

  polygon: {
    bridges: [
      '0xa801b1A7846156d4C81bD188F96bfcb621517611',
    ],
    tokens: {
      PYR: '0x430ef9263e76dae63c84292c3409d61c598e9682',
      CCO2: '0x82B37070e43C1BA0EA9e2283285b674eF7f1D4E2',
      WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      MV: '0xA3c322Ad15218fBFAEd26bA7f616249f7705D945',
    }
  },
  ethereum: {
    bridges: [
      '0x0AD6741312Fc2a9FdB21D3Ce8AFaA08ad0C8c996',
    ],
    tokens: {
      PYR: '0x430ef9263e76dae63c84292c3409d61c598e9682',
      // CCO2: '0x82B37070e43C1BA0EA9e2283285b674eF7f1D4E2',
      // WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      // WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      // USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      // MV: '0xA3c322Ad15218fBFAEd26bA7f616249f7705D945',
    }
  },
}

module.exports = {
};

Object.keys(config).forEach(chain => {
  module.exports[chain] = {
    tvl: (_, _b, {[chain]: block}) => {
      const { bridges: owners, tokens } = config[chain]
      return sumTokens2({ tokens: Object.values(tokens), owners, chain, block, })
    }
  }
})

