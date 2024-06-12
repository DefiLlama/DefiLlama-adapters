const { request, gql } = require('graphql-request');
const { sumTokens2 } = require('../helper/unwrapLPs')

const graphs = {
  ethereum: 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/2ZoJCp4S7YP7gbYN2ndsYNjPeZBV1PMti7BBoPRRscNq',
  optimism: 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/3QfEXbPfP23o3AUzcmjTfRtUUd4bfrFj3cJ4jET57CTX',
}

function tvlPaged(chain) {
  return async (api) => {
    const block = await api.getBlock()
    const size = 1000
    let lastId = ''
    let brokerbots
    let graphQueryPaged = gql`
    query brokerbotQuery($lastId: String, $block: Int) {
      brokerbots(block: { number: $block } first:${size} where: {id_gt: $lastId totalValueLockedUSD_gt: 100}) {
        id
        token { id }
        base { id }
      }
    }
  `

    do {
      const res = await request(graphs[chain], graphQueryPaged, { lastId, block: block - 5000 });
      brokerbots = res.brokerbots
      const tokensAndOwners = brokerbots.map(i => ([[i.token.id, i.id], [i.base.id, i.id]])).flat()
      await sumTokens2({ tokensAndOwners, api })
      lastId = brokerbots[brokerbots.length - 1]?.id
    } while (brokerbots.length === size)
  }
}

module.exports = {
  methodology: `Counts the tokens locked on brokerbots, pulling the brokerbot addresses from the 'aktionariat/brokerbot' subgraph`,
  timetravel: false,
  hallmarks: []
}
const chains = ['ethereum', 'optimism']

chains.forEach(chain => {
  module.exports[chain] = {
    tvl: tvlPaged(chain)
  }
})
