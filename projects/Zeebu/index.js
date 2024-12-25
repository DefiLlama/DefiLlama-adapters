const { sumTokensExport, sumTokens2 } = require('../helper/unwrapLPs');
const { stakings } = require("../helper/staking");
const { pool2s } = require("../helper/pool2");

const VOTING_ESCROW_ADDRESSES = {
  ethereum: '0x8e76Cdf3b14c540aB54aFa7f8492AC1d16Ecfb35',
  base: '0xcf08d1ec5d8e566d95299399307f75f98d6aea03',
  bsc: '0xd3e8cD2eDbf252860E02ffb245fD654b1ab30f30',
};

const ZBU_ADDRESSES = {
  ethereum: '0xe77f6aCD24185e149e329C1C0F479201b9Ec2f4B',
  base: '0x2C8C89C442436CC6C0a77943E09c8Daf49Da3161',
  bsc: '0x4D3dc895a9EDb234DfA3e303A196c009dC918f84',
};

const POOLS = {
  base: {
    balancer: [
      '0x59501a303b1bdf5217617745acec4d99107383f0',
      '0xC3889F9764d68BDF2e16f237206746344172A147',
    ],
    uniswap: ['0x021235b92A4F52C789F43a1B01453c237C265861','0xbF6eF625DE5DF898CC1d0f91868AaE03976A2E2d','0xd5A6f9ee3BC59D5ab4D2638c30B70dBD89DD740D'],
    pancakeswap: ['0x6D5f64FB9c634b3cE3Ffd67035D9B70654fE1442','0x6bC87443d501f7413F43Ce59428cE360034D64A6'],
  },
};

const BALANCER_VAULT_ADDRESS = '0xba12222222228d8ba445958a75a0704d566bf2c8';

const lpTokens = [
  '0xC3889F9764d68BDF2e16f237206746344172A147'
];

const stackingcontract = [
  '0x45dd22aCe398002b34cB37b363B2F02C7dd47842'
];

/**
 * Helper function to calculate TVL for a specific pool type
 */
async function calculatePoolTvl({ api, owner, tokens, poolOwners }) {
  return sumTokens2({
    api,
    owner,
    owners: poolOwners,
    tokens,
  });
}

/**
 * Generalized TVL calculation function
 */
async function calculateTvl({ chain, api }) {
  
  const votingEscrowTvl = await sumTokensExport({
    owners: [VOTING_ESCROW_ADDRESSES[chain]],
    tokens: [ZBU_ADDRESSES[chain]],
    api,
  })();

  if (chain === 'base') {
    const balancerTvl = await calculatePoolTvl({
      api,
      owner: BALANCER_VAULT_ADDRESS,
      tokens: [ZBU_ADDRESSES.base],
      poolOwners: POOLS.base.balancer,
    });

    const uniswapTvl = await calculatePoolTvl({
      api,
      tokens: [ZBU_ADDRESSES.base],
      poolOwners: POOLS.base.uniswap,
    });

    const pancakeswapTvl = await calculatePoolTvl({
      api,
      tokens: [ZBU_ADDRESSES.base],
      poolOwners: POOLS.base.pancakeswap,
    });

    return {
      ...votingEscrowTvl,
      ...balancerTvl,
      ...uniswapTvl,
      ...pancakeswapTvl,
    };
  }

  return votingEscrowTvl;
}

async function calculatePool2Tvl({ api, pools, tokens, owner }) {
  // Sum tokens across multiple pools
  return sumTokens2({
    api,
    owner,
    owners: pools,
    tokens,
  });
}

module.exports = {
  ethereum: {
    staking :  stakings([VOTING_ESCROW_ADDRESSES["ethereum"]],ZBU_ADDRESSES["ethereum"]),
    tvl: () => ({})
    
  },
  base: {
   staking :  stakings([VOTING_ESCROW_ADDRESSES["base"]],ZBU_ADDRESSES["base"]),
    tvl: () => ({}),
    pool2: async (_, _1, _2, { api }) =>
      calculatePool2Tvl({
        api,
        pools: [...POOLS.base.balancer, ...POOLS.base.uniswap, ...POOLS.base.pancakeswap],
        tokens: [ZBU_ADDRESSES.base],
        owner: BALANCER_VAULT_ADDRESS,
      }),
    
  },
  bsc: {
    staking :  stakings([VOTING_ESCROW_ADDRESSES["bsc"]],ZBU_ADDRESSES["bsc"]),
    tvl: () => ({})
    
  },
  
  methodology:
    'Counts ZBU tokens locked in Voting Escrow contracts across Ethereum, Base, and BSC.',
};
