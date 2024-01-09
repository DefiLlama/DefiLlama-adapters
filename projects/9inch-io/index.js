const { getUniTVL } = require('../helper/unknownTokens')
const { sumTokensExport } = require('../helper/unwrapLPs')
const config = {
  ethereum: '0xcBAE5C3f8259181EB7E2309BC4c72fDF02dD56D8',
  pulse: '0x5b9f077a77db37f3be0a5b5d31baeff4bc5c0bd7',
}

const staking = {
  pulse: {
    tokensAndOwners: [
      ['0x3ca80d83277e721171284667829c686527B8b3c5', '0x8878f27fD90922F4DeBb91dcf5B6E6301C23fE33'],
      ['0x8b4cfb020aF9AcAd95AD80020cE8f67FBB2C700E', '0x0e173B11523feB064FD483209d0eD534831A2a86'],
      ['0x9565c2036963697786705120Fc59310F747bCfD0', '0xFEF11BfA82A66e845Cb7EF815B83B2d22C324131'],
      ['0x52Ada28F70BC8EBe5dd4381120d3CD76863919A8', '0x8A402a93469D5820079529CA093595e0d9AF62Ac'],
      ['0x95B303987A60C71504D99Aa1b13B4DA07b0790ab', '0x0Ea7f06D7694058B82d46Fb5c9281e1843Aa8702'],
      ['0xDe0220b69CE3e855a0124433A8E8D093f53A6bE4', '0xa1EAee97ee29e2C80ee9F1321E0132f19b45A26A'],
    ]
  },
  ethereum: {
    tokensAndOwners: [
      ['0x9565c2036963697786705120Fc59310F747bCfD0', '0x3eFC853438e9c06130D104088d73647517617887'],
      ['0x9565c2036963697786705120Fc59310F747bCfD0', '0xa1EAee97ee29e2C80ee9F1321E0132f19b45A26A'],
      ['0xFD8b9Ba4845fB38c779317eC134b298C064937a2', '0x9b2B253D75DC61FC9ae512e04850e258bEbEf8C6'],
      ['0x015628ce9150db1bce2fbb717a09e846f8a32436', '0x0e173B11523feB064FD483209d0eD534831A2a86'],
      ['0x015628ce9150db1bce2fbb717a09e846f8a32436', '0x91c58Cf141ABBEB6aB8D83976103Bca70b69C24e'],
      ['0x015628ce9150db1bce2fbb717a09e846f8a32436', '0xdf598bfe7b8eB5ABd217871317E31a48d9E4432F'],
      ['0x52ada28f70bc8ebe5dd4381120d3cd76863919a8', '0xdBD90Fc90101Bdd5EE0e8b2C26A32c9E59047415'],
      ['0x52ada28f70bc8ebe5dd4381120d3cd76863919a8', '0x0022E0C25BbA451b08942367b98e4B4a617538f2'],
      ['0xDe0220b69CE3e855a0124433A8E8D093f53A6bE4', '0x664e78C17d64234440A26CA72a6946A270251059'],
      ['0xDe0220b69CE3e855a0124433A8E8D093f53A6bE4', '0x211F7596Db264469c4114db5C41b86E173B0A29a'],
      ['0x2de509bf0014ddf697b220be628213034d320ece', '0xB9BB00965AC5c8e8b261243C3C442E3F00B82C1F'],
      ['0x2de509bf0014ddf697b220be628213034d320ece', '0xEA01a51a675170d4939C1439d558Eb3B896C29Ec'],
    ]
  }
}

module.exports = {
  misrepresentedTokens: true
}

Object.keys(config).forEach(chain => {
  const factory = config[chain]
  const sConfig = staking[chain]
  module.exports[chain] = {
    tvl: getUniTVL({ factory, useDefaultCoreAssets: true, }),
    staking: sConfig ? sumTokensExport(sConfig) : undefined
  }
})