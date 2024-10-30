const { sumTokens2, PANCAKE_NFT_ADDRESS } = require('../helper/unwrapLPs')

const earnETHVault = '0x9Ed15383940CC380fAEF0a75edacE507cC775f22';
const pancakeswapMasterChef = '0x556B9306565093C855AEA9AE92A594704c2Cd59e'

const ethTokens = [
    '0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0', // rswETH
    '0xf951E335afb289353dc249e82926178EaC7DEd78', // swETH
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0', // wstETH
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
]

const pendleLPTokens = [
    "0x7C7FbB2d11803C35Aa3e283985237aD27f64406B", //rswETH 26Dec2024
    "0x0e1C5509B503358eA1Dac119C1D413e28Cc4b303", //swETH 26December2024
]

const LPTokens = [
    "0x7B94A5622035207d3f527d236d47B7714Ee0acBa", // Pancakeswap rswETH/WETH 0.05%
]

const vaultTokens = [
    "0x78Fc2c2eD1A4cDb5402365934aE5648aDAd094d0", // Re7 WETH
]

const tokens = [
    ...ethTokens,
    ...pendleLPTokens,
    ...vaultTokens,
]

const tokensAndOwners = tokens.map(token => [token, earnETHVault])

const tvl = async (api) => {
    // return sumTokens2({ api, tokens, resolveLP:true, owner: earnETHVault })

    
    return sumTokens2({ 
            api, 
            tokensAndOwners: tokensAndOwners,
            uniV3nftsAndOwners: [[PANCAKE_NFT_ADDRESS, earnETHVault]], 
            uniV3ExtraConfig: { nftIdFetcher: pancakeswapMasterChef } 
        })
}

module.exports = {
    methodology: 'TVL represents the sum of tokens deposited in the vault',
    doublecounted: true,
    ethereum : { tvl }
}