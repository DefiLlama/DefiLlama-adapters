const ADDRESSES = require("../helper/coreAssets.json");
const methodologies = require("../helper/methodologies");
const abi = {
  getOverallTokensData:
    "function getOverallTokensData(address[] tokens_) view returns ((uint256 borrowRate, uint256 supplyRate, uint256 fee, uint256 lastStoredUtilization, uint256 storageUpdateThreshold, uint256 lastUpdateTimestamp, uint256 supplyExchangePrice, uint256 borrowExchangePrice, uint256 supplyRawInterest, uint256 supplyInterestFree, uint256 borrowRawInterest, uint256 borrowInterestFree, uint256 totalSupply, uint256 totalBorrow, uint256 revenue, (uint256 version, (address token, uint256 kink, uint256 rateAtUtilizationZero, uint256 rateAtUtilizationKink, uint256 rateAtUtilizationMax) rateDataV1, (address token, uint256 kink1, uint256 kink2, uint256 rateAtUtilizationZero, uint256 rateAtUtilizationKink1, uint256 rateAtUtilizationKink2, uint256 rateAtUtilizationMax) rateDataV2) rateData)[] overallTokensData_)",
};

const config = {
  liquidity: "0x52aa899454998be5b000ad077a46bbe360f4e497",
  ethereum: {
    liquidityResolver: (block) => {
      if (block < 19992056) {
        return "0x741c2Cd25f053a55fd94afF1afAEf146523E1249";
      }
      return "0xD7588F6c99605Ab274C211a0AFeC60947668A8Cb";
    },
    weETH: "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",
    zircuit: "0xF047ab4c75cebf0eB9ed34Ae2c186f3611aEAfa6",
  },
  arbitrum: {
    liquidityResolver: (block) => "0x46859d33E662d4bF18eEED88f74C36256E606e44",
  },
};

async function getListedTokens(api) {
  return await api.call({
    target: config[api.chain].liquidityResolver(api.block),
    abi: "function listedTokens() public view returns (address[] memory listedTokens_)",
  });
}

async function tvl(api) {
  const tokens = await getListedTokens(api);
  const chain = api.chain;

  if (chain == "ethereum") {
    // add WeETH deployed to Zircuit
    api.add(
      config.ethereum.weETH,
      await api.call({
        target: config.ethereum.zircuit,
        abi: "function balance(address, address) public view returns (uint256 balance)",
        params: [config.ethereum.weETH, config.liquidity],
      })
    );
  }

  return api.sumTokens({
    owner: config.liquidity,
    tokens: [
      ADDRESSES.null,
      ...tokens.filter(
        (t) => t.toLowerCase() !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      ),
    ],
  });
}

async function borrowed(api) {
  const tokens = await getListedTokens(api);
  const borrowed = await api.call({
    target: config[api.chain].liquidityResolver(api.block),
    abi: abi.getOverallTokensData,
    params: [tokens],
  });
  api.add(
    tokens,
    borrowed.map((x) => x.totalBorrow)
  );
}

module.exports = {
  methodology: methodologies.lendingMarket,
  ethereum: { tvl, borrowed },
  arbitrum: { tvl, borrowed },
};
// node test.js projects/fluid/index.js
