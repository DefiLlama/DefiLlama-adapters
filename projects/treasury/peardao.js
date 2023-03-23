const { sumTokensExport } = require('../helper/unwrapLPs')

const BUSD_TOKEN_CONTRACT = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const USDT_TOKEN_CONTRACT = '0x55d398326f99059ff775485246999027b3197955';
const USDC_TOKEN_CONTRACT = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
const WBNB_TOKEN_CONTRACT = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BTCB_TOKEN_CONTRACT = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c';
const USTC_TOKEN_CONTRACT = '0x23396cF899Ca06c4472205fC903bDB4de249D6fC';

const TREASURY_ADDRESS = '0x263e0910C8c1B77B80CB9947B0FAC3735a6FEf4C';
const tokens =  [
  BUSD_TOKEN_CONTRACT, USDC_TOKEN_CONTRACT, USDT_TOKEN_CONTRACT, WBNB_TOKEN_CONTRACT, USTC_TOKEN_CONTRACT, BTCB_TOKEN_CONTRACT,
]

module.exports = {
  bsc: {
    tvl: sumTokensExport({ chain: 'bsc', tokens, owner: TREASURY_ADDRESS, }),
  }
};