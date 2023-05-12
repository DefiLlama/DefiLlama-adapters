const { nullAddress, treasuryExports } = require("../helper/treasury");

const treasury = "0x086c98855df3c78c6b481b6e1d47bef42e9ac36b"
const treasury2 = "0xa52fd396891e7a74b641a2cb1a6999fcf56b077e"
const BTRF = "0xc55126051B22eBb829D00368f4B12Bde432de5Da"

module.exports = treasuryExports({
  ethereum: {
    tokens: [
      nullAddress,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
      "0x2ba592F78dB6436527729929AAf6c908497cB200", // CREAM
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      "0x5aFE3855358E112B5647B952709E6165e1c1eEEe", // SAFE
      "0xaa0C3f5F7DFD688C6E646F66CD2a6B66ACdbE434",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xaCe78D9BaB82b6B4783120Dba82aa10B040A14D9",
      "0xBCe0Cf87F513102F22232436CCa2ca49e815C3aC"
    ],
    ownTokens: [BTRF],
    owners: [treasury, treasury2],
  },
});