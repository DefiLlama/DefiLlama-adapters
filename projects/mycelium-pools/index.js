const sdk = require("@defillama/sdk");
const abi = require("./abi.json");
const { sumTokens2 } = require("../helper/unwrapLPs");

const USDC = "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8";
const chain = "arbitrum";

// Both v1 and v2 factories
const factoryPoolContractsConfig = [
  {
    fromBlock: 1009749,
    contract: "0x98C58c1cEb01E198F8356763d5CbA8EB7b11e4E2",
  },
  {
    fromBlock: 13387522,
    contract: "0x3Feafee6b12C8d2E58c5B118e54C09F9273c6124",
  },
];

const getPoolsTvl = () => {
  return async (_, _block, { [chain]: block }) => {
    let factories = [];
    if (!block) factories = factoryPoolContractsConfig.map((i) => i.contract);
    else {
      factoryPoolContractsConfig
        .filter((i) => block > i.fromBlock)
        .forEach((i) => factories.push(i.contract));
    }
    const { output: numPools } = await sdk.api.abi.multiCall({
      calls: factories.map((i) => ({ target: i })),
      abi: abi.numPools,
      chain,
      block,
    });

    const calls = [];
    numPools.forEach((i) => {
      for (let j = 0; j < +i.output; j++)
        calls.push({ target: i.input.target, params: j });
    });

    const { output: pools } = await sdk.api.abi.multiCall({
      abi: abi.pools,
      calls,
      chain,
      block,
    });

    const owners = pools.map((i) => i.output);
    const sumTokens = await sumTokens2({
      owners,
      chain,
      block,
      tokens: [USDC],
    });
    return sumTokens;
  };
};

module.exports = {
  misrepresentedTokens: true,
  arbitrum: {
    tvl: getPoolsTvl(),
  },
  methodology:
    "We count liquidity on the Leveraged Pools through PoolFactory contract.",
};
