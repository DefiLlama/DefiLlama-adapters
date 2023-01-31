const sdk = require('@defillama/sdk');
const BigNumber = require("bignumber.js");
const { GraphQLClient, gql } = require('graphql-request')
const { toUSDTBalances } = require('../helper/balances');
const { getBlock } = require('../helper/http');
async function getTVL(subgraphName, block) {
  // delayed by around 5 mins to allow subgraph to update
  block -= 100;
  var endpoint = `https://api.thegraph.com/subgraphs/name/balancer-labs/${subgraphName}`
  var graphQLClient = new GraphQLClient(endpoint)

  var query = gql`
  query get_tvl($block: Int) {
    pools (
      orderBy: totalLiquidity
      orderDirection:desc
      block: { number: $block }
    ){
      id
      name
      owner
      address
      totalLiquidity
    }
  }
  `;
  const results = await graphQLClient.request(query, {
    block
  })

  results.pools.forEach(i => {
    if (+i.totalLiquidity > 1e10) console.log('bad pool: ', i)
  })
  return results.pools
    .map(i => +i.totalLiquidity)
    .filter(i => i < 1e10)  // we filter out if liquidity is higher than 10B as it is unlikely/error
    .reduce((acc, i) => acc + i, 0)
}

async function getTVLFromPools(subgraphName, block) {
  // delayed by around 5 mins to allow subgraph to update
  block -= 100;
  var endpoint = `https://api.thegraph.com/subgraphs/name/balancer-labs/${subgraphName}`
  var graphQLClient = new GraphQLClient(endpoint)

  var query = gql`
  query get_tvl($block: Int) {
    pools (
      block: { number: $block }
      orderBy: liquidity
      orderDirection:desc
    ) {
      liquidity
      name
      publicSwap
      tokens
    }
  }
  `;
  const results = await graphQLClient.request(query, {
    block
  })
  results.pools.forEach(i => {
    if (+i.liquidity > 1e10) console.log('bad pool: ', i)
  })
  return results.pools
    .map(i => +i.liquidity)
    .filter(i => i < 1e10)  // we filter out if liquidity is higher than 10B as it is unlikely/error
    .reduce((acc, i) => acc + i, 0)
}

async function ethereum(timestamp, ethBlock) {
  const [v1,v2] = await Promise.all([getTVLFromPools("balancer", ethBlock), getTVL("balancer-v2", ethBlock)])

  return toUSDTBalances(BigNumber(v1).plus(v2))
}

async function polygon(timestamp, ethBlock, chainBlocks) {
  return toUSDTBalances(await getTVL("balancer-polygon-v2", await getBlock(timestamp, "polygon", chainBlocks)))
}

async function arbitrum(timestamp, ethBlock, chainBlocks) {
  return toUSDTBalances(await getTVL("balancer-arbitrum-v2", await getBlock(timestamp, "arbitrum", chainBlocks)))
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: true,
  methodology: `Balancer TVL is pulled from the Balancer subgraph and includes deposits made to Balancer v1 and v2 liquidity pools.`,
  hallmarks:[
      [1618857407, "Balancer V2 Launched"],
      [1648232593, "veBAL Launched"],
      [1655380615, "Aura Launched]
  ],
  ethereum:{
    tvl: ethereum
  },
  polygon:{
    tvl: polygon
  },
  arbitrum:{
    tvl: arbitrum
  },
}
