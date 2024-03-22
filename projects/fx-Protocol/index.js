const ADDRESSES = require("../helper/coreAssets.json");

const stETHTreasury = "0x0e5CAA5c889Bdf053c9A76395f62267E653AFbb0";
const stETH = ADDRESSES.ethereum.STETH;
const fxUSD_wstETHTreasury = "0xED803540037B0ae069c93420F89Cd653B6e3Df1f";
const fxUSD_sfrxETHTreasury = "0xcfEEfF214b256063110d3236ea12Db49d2dF2359";
const rUSD_weETHTreasury = "0x781BA968d5cc0b40EB592D5c8a9a3A4000063885";
const wstETH = ADDRESSES.ethereum.WSTETH;
const sfrxETH = ADDRESSES.ethereum.sfrxETH;
const weETH = ADDRESSES.ethereum.weETH;

async function tvl(api) {
  const totalSupply = await api.call({
    target: stETH,
    abi: "erc20:balanceOf",
    params: stETHTreasury,
  });
  const fxUSDWstETHtotalSupply = await api.call({
    target: fxUSD_wstETHTreasury,
    abi: "uint256:totalBaseToken",
  });
  const fxUSDSfrxETHtotalSupply = await api.call({
    target: fxUSD_sfrxETHTreasury,
    abi: "uint256:totalBaseToken",
  });
  const rUSDWeETHtotalSupply = await api.call({
    target: rUSD_weETHTreasury,
    abi: "uint256:totalBaseToken",
  });
  api.add(stETH, totalSupply);
  api.add(wstETH, fxUSDWstETHtotalSupply);
  api.add(sfrxETH, fxUSDSfrxETHtotalSupply);
  api.add(weETH, rUSDWeETHtotalSupply);
}

module.exports = {
  doublecounted: true,
  ethereum: {
    tvl,
  },
};
