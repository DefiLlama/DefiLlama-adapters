const { sumTokens2, getConnection } = require("../helper/solana");
const { PublicKey } = require("@solana/web3.js")
const { decodeAccount } = require('../helper/utils/solana/layout')
const ADDRESSES = require('../helper/coreAssets.json')

async function staking() {
  const connection = getConnection("solana");

  const res = await connection.getMultipleAccountsInfo([
    // ADX Staked Tokens
    new PublicKey('9nD5AenzdbhRqWo7JufdNBbC4VjZ5QH7jzLuvPZy2rhb'),

    // ALP Staked Tokens
    new PublicKey('HYDnBK56NXcdaeKzVqTRBbm4aaRmfy2oErjrb1YfH7Zg'),
  ]);

  return {
    // ADX
    'solana:AuQaustGiaqxRvj2gtCdrd22PBzTn8kM3kEPEkZCtuDw': decodeAccount('tokenAccount', res[0]).amount.toString(),
    
    // ALP
    'solana:4yCLi5yWGzpTWMQ1iWHG5CrGYAdBkhyEdsuSugjDUqwj': decodeAccount('tokenAccount', res[1]).amount.toString(),
  };
}

async function tvl(api) {
  const connection = getConnection("solana");

  await sumTokens2({ 
    owner: '4o3qAErcapJ6gRLh1m1x4saoLLieWDu7Rx3wpwLc7Zk9',
    balances: api.getBalances(),
    blacklistedTokens: [
      'AuQaustGiaqxRvj2gtCdrd22PBzTn8kM3kEPEkZCtuDw',  // ADX
      '4yCLi5yWGzpTWMQ1iWHG5CrGYAdBkhyEdsuSugjDUqwj',  // ALP
    ],
  });

  const rewards = await connection.getAccountInfo(new PublicKey('5GAFPnocJ4GUDJJxtExBDsH5wXzJd3RYzG8goGGCneJi'));

  // Remove rewards from AUM
  api.add(ADDRESSES.solana.USDC, +decodeAccount('tokenAccount', rewards).amount.toString() * -1)
}

module.exports = {
  timetravel: false,
  methodology: "TVL counts tokens deposited in the Liquidity Pool.",
  solana: {
    tvl,
    staking,
  },
};
