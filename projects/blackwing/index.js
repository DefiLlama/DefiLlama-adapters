const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokensExport } = require("../helper/unwrapLPs");

const BLACKWING_VAULT_ARBITRUM = '0xc6aDE8A68026d582AB37B879D188caF7e405dD09'
const BLACKWING_VAULT_ETH = '0xc6aDE8A68026d582AB37B879D188caF7e405dD09'
const BLACKWING_VAULT_BSC = '0xD00789260984160a64DcF19A03896DfF73BF4514'

const ARBITRUM_WEETH = "0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe";
const ARBITRUM_EZETH = ADDRESSES.blast.ezETH;

const ARBITRUM_PT_RSETH_27JUN2024 = "0xafd22f824d51fb7eed4778d303d4388ac644b026";
const ARBITRUM_PT_WEETH_27JUN2024 = "0x1c27ad8a19ba026adabd615f6bc77158130cfbe4";
const ARBITRUM_PT_EZETH_27JUNE2024 = "0x8ea5040d423410f1fdc363379af88e1db5ea1c34";

const ETHEREUM_MAINNET_RSWETH = '0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0';
const ETHEREUM_MAINNET_RSETH = "0xa1290d69c65a6fe4df752f95823fae25cb99e5a7";
const ETHEREUM_MAINNET_WEETH = "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee";
const ETHEREUM_MAINNET_EZETH = "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110";

const ETHEREUM_MAINNET_PENDLE_RSWETH_27JUN2024 = "0x5cb12D56F5346a016DBBA8CA90635d82e6D1bcEa";
const ETHEREUM_MAINNET_PT_EZETH_26DEC2024 = "0xf7906f274c174a52d444175729e3fa98f9bde285";
const ETHEREUM_MAINNET_PT_RSETH_27JUN2024 = "0xb05cabcd99cf9a73b19805edefc5f67ca5d1895e";
const ETHEREUM_MAINNET_PT_USDE_25JUL2024 = "0xa0021ef8970104c2d008f38d92f115ad56a9b8e1";
const ETHEREUM_MAINNET_PT_ENA_29AUG2024 = "0x9946c55a34cd105f1e0cf815025eaecff7356487";
const ETHEREUM_MAINNET_PT_RSWETH_27JUN2024 = "0x5cb12d56f5346a016dbba8ca90635d82e6d1bcea";
const ETHEREUM_MAINNET_PT_SUSDE_25JUL2024 = "0xd810362556296c834e30c9a61d8e21a5cf29eab4";
const ETHEREUM_MAINNET_PT_WEETH_26DEC2024 = "0x6ee2b5e19ecba773a352e5b21415dc419a700d1d";
const ETHEREUM_MAINNET_PT_WEETH_27JUN2024 = "0xc69ad9bab1dee23f4605a82b3354f8e40d1e5966";

const ETHEREUM_MAINNET_SHIB_ADDRESS = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
const ETHEREUM_MAINNET_PEPE_ADDRESS = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";
const ETHEREUM_MAINNET_EGETH_ADDRESS = "0x18f313Fc6Afc9b5FD6f0908c1b3D476E3feA1DD9";
const ETHEREUM_MAINNET_PUFETH_ADDRESS = "0xD9A442856C234a39a81a089C06451EBAa4306a72";
const ETHEREUM_MAINNET_MSTETH_ADDRESS = "0x49446A0874197839D15395B908328a74ccc96Bc0";
const ETHEREUM_MAINNET_APXETH_ADDRESS = "0x9Ba021B0a9b958B5E75cE9f6dff97C7eE52cb3E6";
const ETHEREUM_MAINNET_MSWETH_ADDRESS = "0x32bd822d615A3658A68b6fDD30c2fcb2C996D678";

module.exports = {
  arbitrum: {
    tvl: sumTokensExport({ tokens: [
      ADDRESSES.arbitrum.USDC_CIRCLE,
      ADDRESSES.arbitrum.USDC, 
      ADDRESSES.arbitrum.WETH, 
      ARBITRUM_EZETH, 
      ARBITRUM_WEETH,
      ARBITRUM_PT_RSETH_27JUN2024,
      ARBITRUM_PT_WEETH_27JUN2024,
      ARBITRUM_PT_EZETH_27JUNE2024,
    ],
    owner: BLACKWING_VAULT_ARBITRUM, fetchCoValentTokens: true, }),
  },
  ethereum: {
    tvl: sumTokensExport({
      tokens: [
        ADDRESSES.ethereum.USDC,
        ADDRESSES.ethereum.WETH,
        ETHEREUM_MAINNET_RSWETH, 
        ETHEREUM_MAINNET_RSETH, 
        ETHEREUM_MAINNET_EZETH, 
        ADDRESSES.ethereum.EETH,
        ETHEREUM_MAINNET_WEETH, 
        ADDRESSES.ethereum.sUSDe,
        ETHEREUM_MAINNET_PENDLE_RSWETH_27JUN2024,
        ETHEREUM_MAINNET_PENDLE_RSWETH_27JUN2024,
        ETHEREUM_MAINNET_PT_EZETH_26DEC2024,
        ETHEREUM_MAINNET_PT_RSETH_27JUN2024,
        ETHEREUM_MAINNET_PT_USDE_25JUL2024,
        ETHEREUM_MAINNET_PT_ENA_29AUG2024,
        ETHEREUM_MAINNET_PT_RSWETH_27JUN2024,
        ETHEREUM_MAINNET_PT_SUSDE_25JUL2024,
        ETHEREUM_MAINNET_PT_WEETH_26DEC2024,
        ETHEREUM_MAINNET_PT_WEETH_27JUN2024,
        ETHEREUM_MAINNET_SHIB_ADDRESS,
        ETHEREUM_MAINNET_PEPE_ADDRESS,
        ETHEREUM_MAINNET_EGETH_ADDRESS,
        ETHEREUM_MAINNET_PUFETH_ADDRESS,
        ETHEREUM_MAINNET_MSTETH_ADDRESS,
        ETHEREUM_MAINNET_APXETH_ADDRESS,
        ETHEREUM_MAINNET_MSWETH_ADDRESS
      ], owner: BLACKWING_VAULT_ETH, fetchCoValentTokens: true,
    })
  },
  bsc: {
    tvl: sumTokensExport({
      tokens: [
        ADDRESSES.bsc.USDT,
        ADDRESSES.bsc.WBNB
      ],
      owner: BLACKWING_VAULT_BSC, fetchCoValentTokens: true,
    })
  }
}
