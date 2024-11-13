const SIZE_REGISTRY = '0x'

const abis = {
  SizeRegistry: {
    getMarkets: 'function getMarkets() view returns (address[])',
  },
  Size: {
    data: 'function data() view returns (uint256 nextDebtPositionId,uint256 nextCreditPositionId,address underlyingCollateralToken,address underlyingBorrowToken,address collateralToken,address borrowAToken,address debtToken,address variablePool)',
  },
}


async function tvl(api) {
  const markets = await api.call({ abi: abis.SizeRegistry.getMarkets, target: SIZE_REGISTRY })
  const datas = await api.multiCall({ abi: abis.Size.data, calls: markets })

  const borrowATokens = [...new Set(datas.map(data => data.borrowAToken))]
  const underlyingBorrowTokens = [...new Set(datas.map(data => data.underlyingBorrowToken))]
  const underlyingCollateralTokens = [...new Set(datas.map(data => data.underlyingCollateralToken))]

  const borrowTokensTVL = await api.sumTokens({ owners: borrowATokens, tokens: underlyingBorrowTokens })
  const collateralTokensTVL = await api.sumTokens({ owners: markets, tokens: underlyingCollateralTokens })

  return borrowTokensTVL + collateralTokensTVL
}

async function borrowed(api) {
  const markets = await api.call({ abi: abis.SizeRegistry.getMarkets, target: SIZE_REGISTRY })
  const datas = await api.multiCall({ abi: abis.Size.data, calls: markets })

  const debtTokens = datas.map(data => data.debtToken)

  const underlyingBorrowTokens = [...new Set(datas.map(data => data.underlyingBorrowToken))]
  const totalDebts = await api.multiCall({ abi: 'erc20:totalSupply', calls: debtTokens });

  return api.add(underlyingBorrowTokens, totalDebts)
}

module.exports = {
  base: {
    tvl,
    borrowed
  }
}
