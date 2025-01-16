const { sumTokensExport } = require("../helper/sumTokens");
const bitcoinAddressBook = require('../helper/bitcoin-book/index.js')

// Lorenzo Protocol Tota TVL
const allBtcAddressList = [...bitcoinAddressBook.lorenzo, ...bitcoinAddressBook.lorenzo2]
module.exports = {
  methodology: "Lorenzo, As the Bitcoin Liquidity Finance Layer",
  doublecounted:true,
  bitcoin: { tvl: sumTokensExport({ owners : allBtcAddressList }) }
};