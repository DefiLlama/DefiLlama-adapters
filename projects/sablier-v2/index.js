const sdk = require("@defillama/sdk");
const { isWhitelistedToken } = require('../helper/streamingHelper')
const { cachedGraphQuery } = require('../helper/cache')

async function getTokensConfig(api, isVesting) {
  const ownerTokens = []
  const { endpoints } = config[api.chain]
  let i = 0
  for (const endpoint of endpoints) {
    i++
    const { contracts, assets } = await cachedGraphQuery('sablier-v2/' + api.chain + '-' + i, endpoint, `{
      contracts { id address category }
      assets { id chainId symbol }
    }`)
    const owners = contracts.map(i => i.address)
    let tokens = assets.map(i => i.id)
    const symbols = assets.map(i => i.symbol)
    tokens = tokens.filter((v, i) => isWhitelistedToken(symbols[i], v, isVesting))
    owners.forEach(owner => ownerTokens.push([tokens, owner]))
  }

  return { ownerTokens }
}

async function tvl(api) {
  return api.sumTokens(await getTokensConfig(api, false))
}

async function vesting(api) {
  return api.sumTokens(await getTokensConfig(api, true))
}

const config = {
  ethereum: { endpoints: ['5EgaXheiBXZBCkepyGUYAu8pN31Dkbh7bpGtnLPqaT5m'], },
  arbitrum: { endpoints: ['AR77w8PwmkAG7c9DJSsfW6yTrC5UdvdQ1Hz5ZTCuaUWz'], },
  ethereum: { endpoints: ['EuZZnhFtdCGqN2Zt7EMGYDqQKNrVuhJL63KAfwvF35bL'], },
  arbitrum: { endpoints: ['8BnGPBojHycDxVo83LP468pUo4xDyCQbtTpHGZXR6SiB'], },
  bsc: { endpoints: ['BVyi15zcH5eUg5PPKfRDDesezMezh6cAkn8LPvh7MVAF'], },
  xdai: { endpoints: [sdk.graph.modifyEndpoint('EXhNLbhCbsewJPx4jx5tutNXpxwdgng2kmX1J7w1bFyu')], },
  optimism: { endpoints: [sdk.graph.modifyEndpoint('6e6Dvs1yDpsWDDREZRqxGi54SVdvTNzUdKpKJxniKVrp')], },
  polygon: { endpoints: ['J8XJaFtxcz7xowzVJ5LwZhi35N5Lbtwfrt4sea6G1ysJ'], },
  polygon: { endpoints: ['CsDNYv9XPUMP8vufuwDVKQrVhsxhzzRHezjLFFKZZbrx'], },
  avax: { endpoints: [sdk.graph.modifyEndpoint('FdVwZuMV43yCb1nPmjnLQwmzS58wvKuLMPzcZ4UWgWAc')], },
  base: { endpoints: [sdk.graph.modifyEndpoint('HS6B8Wi9ZY7D9bjHEuJwDqHa5eCMX5d6H59YyGVnQ5QP')], },
  blast: { endpoints: ['https://api.studio.thegraph.com/query/57079/sablier-v2-blast/version/latest'], },
  base: { endpoints: [sdk.graph.modifyEndpoint('3pxjsW9rbDjmZpoQWzc5CAo4vzcyYE9YQyTghntmnb1K')], },
  blast: { endpoints: [sdk.graph.modifyEndpoint('BXoC2ToMZXnTmCjWftQRPh9zMyM7ysijMN54Nxzb2CEY')], },
  scroll: { endpoints: [sdk.graph.modifyEndpoint('HVcngokCByfveLwguuafrBC34xB65Ne6tpGrXHmqDSrh')], },
  era: { endpoints: [sdk.graph.modifyEndpoint('GY2fGozmfZiZ3xF2MfevohLR4YGnyxGxAyxzi9zmU5bY')], },
}

Object.keys(config).forEach(chain => {
  module.exports[chain] = { tvl, vesting }
})
