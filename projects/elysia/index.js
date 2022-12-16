const sdk = require("@defillama/sdk");
const { stakings } = require("../helper/staking");
const { sumTokensExport } = require("../helper/unwrapLPs");
const abi = require("./abi.json");

const addresses = {
  elfi: "0x4da34f8264cb33a5c9f17081b9ef5ff6091116f4",
  el: "0x2781246fe707bb15cee3e5ea354e2154a2877b16",
  elStaking: "0x3F0c3E32bB166901AcD0Abc9452a3f0c5b8B2C9D",
  dai: "0x6b175474e89094c44da98b954eedeac495271d0f", // ETH
  usdt: "0xdac17f958d2ee523a2206206994597c13d831ec7", // ETH
  usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // ETH
  busd: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // BSC
  elfiStaking: [
    "0xb41bcd480fbd986331eeed516c52e447b50dacb4",
    "0xCD668B44C7Cf3B63722D5cE5F655De68dD8f2750",
    "0x24a7fb55e4ac2cb40944bc560423b496dfa8803f",
  ],
  bscElfi: "0x6C619006043EaB742355395690c7b42d3411E8c0",
  bscElfiStaking: [
    "0x73653254ED0F28D6E5A59191bbB38B06C899fBcA",
    "0x861c2221e4d73a97cd94e64c7287fd968cba03e4",
  ],
};

const moneyPools = {
  ethereum: [
    [addresses.dai, "0x527c901e05228f54a9a63151a924a97622f9f173"],
    [addresses.usdt, "0xe0bda8e3a27e889837ae37970fe97194453ee79c"],
    [addresses.usdc, "0x3fea4cc5a03e372ac9cded96bd07795ac9034d71"],
  ],
  bsc: [[addresses.busd, "0x5bb4d02a0ba38fb8b916758f11d9b256967a1f7f"]],
};

const dataPipelines = {
  ethereum: "0x128AF7E290ECCDe0050f33A1b5A4Bc8b2BB4d817",
  bsc: "0xA63830cCCDcd380b00EF00f070357Cb03cDc2E7b",
};

function deposited(chain) {
  return async (_, _b, { [chain]: block }) => {
    const dataPipeline = dataPipelines[chain];
    const pools = moneyPools[chain];

    const { output: reserves } = await sdk.api.abi.multiCall({
      abi,
      calls: pools.map((i) => ({ target: dataPipeline, params: i[0] })),
      chain,
      block,
    });

    const balances = {};
    reserves.forEach(({ input: { params }, output }, i) => {
      sdk.util.sumSingleBalance(
        balances,
        params[0],
        output.totalLTokenSupply,
        chain
      );
    });

    return balances;
  };
}

function borrowed(chain) {
  return async (_, _b, { [chain]: block }) => {
    const dataPipeline = dataPipelines[chain];
    const pools = moneyPools[chain];

    const { output: reserves } = await sdk.api.abi.multiCall({
      abi,
      calls: pools.map((i) => ({ target: dataPipeline, params: i[0] })),
      chain,
      block,
    });

    const balances = {};
    reserves.forEach(({ input: { params }, output }, i) => {
      sdk.util.sumSingleBalance(
        balances,
        params[0],
        output.totalDTokenSupply,
        chain
      );
    });

    return balances;
  };
}

module.exports = {
  ethereum: {
    borrowed: borrowed("ethereum"),
    tvl: deposited("ethereum"),
    staking: sumTokensExport({
      tokens: [addresses.el, addresses.elfi],
      owners: [addresses.elStaking, ...addresses.elfiStaking],
    }),
  },
  bsc: {
    borrowed: borrowed("bsc"),
    tvl: deposited("bsc"),
    staking: stakings(addresses.bscElfiStaking, addresses.bscElfi, "bsc"),
  },
}; // node test.js projects/elysia/index.js
