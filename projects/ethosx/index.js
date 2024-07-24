const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokensExport } = require("../helper/unwrapLPs");
const ETH_PUT_CONTROLLER_ADDRESS = "0x55E008E3b0Aa6808Ca8B8Ba1DC319EC132554aCd";
const ETH_CALL_CONTROLLER_ADDRESS =
  "0x2eEFcBCa065bE1763be58276AFA41627A82dfa2D";
const BTC_PUT_CONTROLLER_ADDRESS = "0x3273C69432b2B0D808499F4Cc56113Be6c7A673F";
const BTC_CALL_CONTROLLER_ADDRESS =
  "0x18AadF2a220D3FEb958Ed161263185f0805D11a1";
const PEPE_PUT_CONTROLLER_ADDRESS =
  "0x9c50C12d3A569cD4285c62cd7A889cE7BCfC12e9";
const PEPE_CALL_CONTROLLER_ADDRESS =
  "0x176a49747a97dD0735a2186aEbe1d1400E3eBf8b";
const WIF_PUT_CONTROLLER_ADDRESS = "0xA1269bF2F05aA11363352eA0cf4E5a071Ef9cF29";
const WIF_CALL_CONTROLLER_ADDRESS =
  "0x47D5710A4ABd8B47e9ec48f6cB04cDBcfBFCA382";
const DOGE_PUT_CONTROLLER_ADDRESS =
  "0x9c50C12d3A569cD4285c62cd7A889cE7BCfC12e9";
const DOGE_CALL_CONTROLLER_ADDRESS =
  "0x176a49747a97dD0735a2186aEbe1d1400E3eBf8b";
const FLOKI_PUT_CONTROLLER_ADDRESS =
  "0xA1269bF2F05aA11363352eA0cf4E5a071Ef9cF29";
const FLOKI_CALL_CONTROLLER_ADDRESS =
  "0x47D5710A4ABd8B47e9ec48f6cB04cDBcfBFCA382";

const USDC_ARB_ADDRESS = ADDRESSES.arbitrum.USDC_CIRCLE;
const USDC_BSC_ADDRESS = ADDRESSES.bsc.USDC;

module.exports = {
  methodology: "TVL counts the USDC held in the controller contracts.",
  start: 1715693000,
  arbitrum: {
    tvl: sumTokensExport({
      owners: [
        ETH_PUT_CONTROLLER_ADDRESS,
        ETH_CALL_CONTROLLER_ADDRESS,
        BTC_PUT_CONTROLLER_ADDRESS,
        BTC_CALL_CONTROLLER_ADDRESS,
        PEPE_PUT_CONTROLLER_ADDRESS,
        PEPE_CALL_CONTROLLER_ADDRESS,
        WIF_PUT_CONTROLLER_ADDRESS,
        WIF_CALL_CONTROLLER_ADDRESS,
      ],
      tokens: [USDC_ARB_ADDRESS],
    }),
  },
  bsc: {
    tvl: sumTokensExport({
      owners: [
        ETH_PUT_CONTROLLER_ADDRESS,
        ETH_CALL_CONTROLLER_ADDRESS,
        BTC_PUT_CONTROLLER_ADDRESS,
        BTC_CALL_CONTROLLER_ADDRESS,
        DOGE_CALL_CONTROLLER_ADDRESS,
        DOGE_PUT_CONTROLLER_ADDRESS,
        FLOKI_CALL_CONTROLLER_ADDRESS,
        FLOKI_PUT_CONTROLLER_ADDRESS,
      ],
      tokens: [USDC_BSC_ADDRESS],
    }),
  },
}; // node test.js projects/mint-club/index.js
