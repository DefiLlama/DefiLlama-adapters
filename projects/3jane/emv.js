const sdk = require("@defillama/sdk")
const abi = require("./abi.json")
const { sumTokens2 } = require("../helper/unwrapLPs")

// Ethereum Vaults
const eEthCallVault = "0xAcD147A5bbCB7166c5BB13A9354ad7a59b99fB4d"

// Ethereum Assets
const weEth = "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee"
const amplol = "0xEadF1dE23Cece2109Cb72517da1b7b710b7509e5"

async function addVaults({
  balances,
  chain,
  vaults,
  block,
  transformAddress = (a) => a,
}) {
  const { output: balanceRes } = await sdk.api.abi.multiCall({
    abi: abi.totalBalance,
    calls: vaults.map((i) => ({ target: i[1] })),
    chain,
    block,
  })

  balanceRes.forEach((data, i) =>
    sdk.util.sumSingleBalance(
      balances,
      transformAddress(vaults[i][0]),
      data.output
    )
  )
}

async function ethTvl(_, block) {
  const balances = {}
  const vaults = [[eEthCallVault]]

  await addVaults({ balances, block, vaults })

  return sumTokens2({
    balances,
    tokens: [weEth],
    block,
  })
}

module.exports = {
  ethereum: {
    tvl: ethTvl,
  },
}
