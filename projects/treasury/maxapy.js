const TREASURY = {
  ethereum: "0x5000Ba796Fd84a0f929AF80Cfe27301f0358F268",
  polygon: "0x91044419869d0921D682a50B41156503A4E484F6"
}

const VAULTS = {
  ethereum: {
    maxETH: "0x9847c14FCa377305c8e2D10A760349c667c367d4",
  },
  polygon: {
    maxETH: "0xA02aA8774E8C95F5105E33c2f73bdC87ea45BD29",
    maxUSD: "0xE7FE898A1EC421f991B807288851241F91c7e376",
  }
}

const tvl = async (api) => {
  const vaults = Object.values(VAULTS[api.chain])
  const tokens = await api.multiCall({ abi: 'address:asset', calls: vaults })
  const balances = await api.multiCall({ abi: 'erc20:balanceOf', calls: vaults.map(vault => ({ target: vault, params: TREASURY[api.chain] })) })
  const bals = await api.multiCall({ abi: 'function convertToAssets(uint256) view returns (uint256)', calls: vaults.map((vault, i) => ({ target: vault, params: balances[i] })) })
  api.add(tokens, bals)
}

module.exports = {
  methodology: "Counts assets held by treasury in ERC4626 vault tokens",
  start: 1729675931,
  ethereum: { tvl },
  polygon: { tvl },
}
