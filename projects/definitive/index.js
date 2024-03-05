const CommunityVaultsLP = {
  arbitrum: [
    "0xbE3cb8CA59487D39b49d33A124cC93a83cB6fd16"
  ],
  avax: [
    "0xe5b54e79cD1D53024A94df479B3099DBE72FB662",
    "0x1499BeB1FBf76420704e12a9F7E3Af99dCc39618",
    "0xEeF282aCCa091bE35AaCC0a6ce38708530749170",
    "0x99C409C681650964296916780A7aB540fFBd4Bc4",
    "0x123384ba6Cde21a3E8874cA878dF9d8a1326A0c6",
    "0x4a86E2ceE61a41a2F5c97906431611F1F26881ec",
    "0x90529324E6901fA8f69F207A6E58CE6F4367a519",
    "0x486B322cbcBf92A463769F0b1284D2b63FD66E2C",
    "0xd91f00d6Add5A1A59589B4756C3193892540B7d0",
    "0x751c09F0803C1351019c2249C3efA42C6e1ABaDD",
    "0xb4d844B64e972eA41dC87714A04EfF4CbFffDBaf"
  ],
  base: [
    "0x85fa0A64c9D181226496A132BbBd1fc34116aAB9",
    "0xc38E40C35469d8e226E6ef39ff6741b5d1ef3C96",
    "0x6221452d88C21eC9D9Ea201191CEbEb47a758228",
    "0x70408e74fF424866c4F3b537892393B0228ea26f",
    "0xf9536Fe70c056f1d1220E5d73E1A2d8e9Ed770Ad",
    "0x20F3A0a03bd4a53eD32A259252469a345F45CB91",
    "0xc252d7692D9540DFb2be9932cfCf22b085dc81F8",
    "0x0F5a1bb0AA76fFfe8216b9D659ae56d948F1c375",
    "0x143e11dC78F8DCd39EDD70A90Baf89588a3a350B",
    "0x9BA4b909E2B40706ff1cD209B34006FD73c42A6D",
    "0x994c3586401a7fA10CA2E73136f7B7d1D251A640",
    "0xd3cc1C60c8C90f0B8CBb6334Da7bdEc505C28255",
    "0xc446F6d3178ccaAf919cB27D1C5FCc21C37f88dd"
  ],
  ethereum: [
    "0xFefb05EB5abc0c378120b93ff37CEc8af4872A18"
  ],
  optimism: [
    "0x4bBC0bFA0ea23fAec258924823bF9a3f870aAa95",
    "0xA1185B84FF6F18C00234995E8BE5aA9e701bad82",
    "0xfCAe29Da7c6cA5de03328E19f67E7b761ae39c15",
    "0x62FA680af3B0F546624645D9E40eE77607D4cEc3",
    "0x5Cdcc84bf78e89Da688d08a5d52100D0c33c751A"
  ],
  polygon: [
    "0x926b5A53A6fd4f11177e5c4781551d5E58d75C3C",
    "0xBF279cc0d2E046F10D042F772dCe98B136f3B811"
  ]
}

const CommunityVaultsLLSD = {
  arbitrum: [
    "0x449b72B665C28D6190ff08A21b2130CaCf06E1c8" // Aave wstETH
  ],
  avax: [
    "0xa460802fc6e7c1401B06078B332d5A1B52dff0D1",
    "0x7402282F04740F2f8CE97eE426f90d6F800A3C21",
  ],
  base: [
    "0xC2cA42Ac871753d4623766581b7A963c2AD7209B",
    "0x035569b57390a095b4b3f7754214b39CA3145C75",
    "0xB3E741Ee16Df64eF9274261A397Df6Fd54073FFB"
  ],
  ethereum: [
    "0x954F286AEc288af89601F53e5D8727540ba2f00f",
    "0x4184a083307a208f5bF20d0B44E161Bc55aae996"
  ],
  optimism: [
    "0x3796103d23D207fB5db2CFEc97fd7a0ac0A70D82",
    "0xB2a74028CcCA97C4fA4686802246FdDEAa3A941B"
  ],
  polygon: [
    "0x8347B60460421EE565F3aC26DaFbAC9D2fE8930e"
  ],
}

const abiMU = {
  underlyingVault: "address:VAULT",
  totalAssets: "uint256:totalAssets",
}

const abiVault = {
  stakingToken: "address:STAKING_TOKEN",
  lpToken: "address:LP_TOKEN"
}

function chainTvl(chain) {
    return async (_, _1, blockNumber, { api }) => {
      /** Hyperstaking Community Vaults */
      const totalAssets = await api.multiCall({
        abi: abiMU.totalAssets,
        calls: CommunityVaultsLLSD[chain].map(i => ({target: i})),
        chain,
        blockNumber
      })

      const underlyingVaults = await api.multiCall({
        abi: abiMU.underlyingVault,
        calls: CommunityVaultsLLSD[chain].map(i => ({target: i})),
        chain,
        blockNumber
      })

      const totalAssetDenominationAsset = await api.multiCall({
        abi: abiVault.stakingToken,
        calls: underlyingVaults.map(i => ({target: i})),
        chain,
        blockNumber
      })

      totalAssetDenominationAsset.forEach((assetAddress, i) => api.add(assetAddress, totalAssets[i]))

      /** LP Community Vaults */
      const totalAssetsLP = await api.multiCall({
        abi: abiMU.totalAssets,
        calls: CommunityVaultsLP[chain].map(i => ({target: i})),
        chain,
        blockNumber
      })

      const underlyingVaultsLP = await api.multiCall({
        abi: abiMU.underlyingVault,
        calls: CommunityVaultsLP[chain].map(i => ({target: i})),
        chain,
        blockNumber
      })

      const totalAssetLPDenominationAsset = await api.multiCall({
        abi: abiVault.lpToken,
        calls: underlyingVaultsLP.map(i => ({target: i})),
        chain,
        blockNumber
      })

      totalAssetLPDenominationAsset.forEach((assetAddress, i) => api.add(assetAddress, totalAssetsLP[i]))
    }
}

module.exports = {
  arbitrum: {
    tvl: chainTvl("arbitrum"),
  },
  avax: {
    tvl: chainTvl("avax"),
  },
  base: {
    tvl: chainTvl("base"),
  },
  ethereum: {
    tvl: chainTvl("ethereum"),
  },
  optimism: {
    tvl: chainTvl("optimism"),
  },
  polygon: {
    tvl: chainTvl("polygon"),
  },
  methodology: "For Hyperstaking, an onchain method calculates collateral + balance - debt. For LP, we can just calculate the value of LP tokens held in the vault"
}