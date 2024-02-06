const { sumTokens2 } = require("./helper/solana");

module.exports = {
  timetravel: false,
  methodology: "Calculate sum across all program token accounts",
  solana: {
    tvl,
  },
};

async function tvl(_, _b, _cb, { api }) {
  const vaults = [
    "Hhed3wTHoVoPpnuBntGf236UfowMMAXfxqTLkMyJJENe", // SOL
    "BC5xAUpEbfeSWi5fJdvhFQhM3eMbTok2c7SY62daB3da", // USDC
    "FuFoCkfnrDjNmwPr54JEAYTUshXA4gQojevfvv3KXdx7", // ETH
    "55UmrYacpb8v7gbKswDofmWjLS8TSP3VB8NKjNfxu11d", // BTC
    "7b2jY9CeCWCnyKBvaLSnsV7qwUhbJGsJTPdyCsspPY7Q" // Virtual Pool - USDC 
  ];

  return sumTokens2({ tokenAccounts: vaults });
}