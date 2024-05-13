const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokensExport, } = require('../helper/unknownTokens')

module.exports = {
  methodology: 'collateral TVL * collateral price', 
  arbitrum: {
    tvl: sumTokensExport({ owners: ['0x5E851dC1f56A05Bb6d3C053FA756304a5171C345', '0x04901268EE65E989852370C0bad08E1514a0C484', '0x9eDC0ea75e6023b93bbB41c16818e314cfE59D2b', '0xEC38621e72D86775a89C7422746de1f52bbA5320', '0x04901268EE65E989852370C0bad08E1514a0C484', '0x30aCD3e86f42Fcc87c6FB9873058d8d7133785d4', '0x394fdEC30250A38869bcB425F96080eD6c1b756a', '0xafCA20A243e4e4936fAF76e8893128A231678677' ], tokens: [
      "0xe05A08226c49b636ACf99c40Da8DC6aF83CE5bB3", //ankrETH
      "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf", //cUSDC
      "0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8", //RETH
      "0x004626A008B1aCdC4c74ab51644093b155e59A23", //stEUR
      "0xe148C9fC6Cb7E968BfF86Ec9A6a881662d8ED9bb", //wcUSDC
      "0x5979D7b546E38E414F7E9822514be443A4800529", //wstETH
      "0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe", //weETH
      "0x2416092f143378750bb29b79eD961ab195CcEea5", //ezETH
    ] }),
  },
  bsc: {
    tvl: sumTokensExport({ owners: ['0x4e90156997BB469c6F5975e13FF1451C9500B711', '0x87ad5Ab05d7C1E1F904e029783810A2a95702563', '0xb44A251d1C31dd32700E5F2584B4282716C43EB3'], tokens: [
      "0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827", //ankrBNB
      "0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8", //vUSDC
      "0xfD5840Cd36d94D7229439859C0112a4185BC0255", //vUSDT
    ] }),
  },
  ethereum: {
    tvl: sumTokensExport({ owners: ['0xb396b31599333739A97951b74652c117BE86eE1D', '0xb396b31599333739A97951b74652c117BE86eE1D', '0xb396b31599333739A97951b74652c117BE86eE1D', '0x97f0BdaDbfAA05a1944fFbA862b3336a175056cF', '0xC5A7bEB1E6c61B3Aa8dF5aD32a17eb5e9B974B98', '0xf824c280De7622E468547E2d3eca7C94Ad8d7169', '0x4d7CabA383F017c4ce8B1F4493482eC0f09c9Ae7', '0x7281d1bCcbe34574Ee6507b3f4816AFBe85A2e3d', '0xD9dbd69974733481eeCD0125898C8Bb63c51f783', '0xc7b219a9A8e246f9C4d4A1c7d4a371F0840ff724', '0xd4E426ABA74Ece196D375e01b53A70ebeA51Cf25', '0x591e68e32eF0fbFc2DbC5916cd70fEFBF3a9F136', '0x7E6173fE3b426755B4B961c6a7686c13E3c82883', '0x0730BA2252670Cd71580dadf471f3E137592e800', '0x47F661404716C3BB35B80C557e13F0EF490bC4Ae', '0xa6466b9827AD5D765579E3Fc9ca0d678C423fB53'], tokens: [
      '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //MATIC
      '0x26dcFbFa8Bc267b250432c01C982Eaf81cC5480C', //ankrMATIC
      '0xb396b31599333739A97951b74652c117BE86eE1D', //ceMATIC
      '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb', //ankrETH
      '0xA35b1B31Ce002FBF2058D22F30f95D405200A15b', //ETHx
      '0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38', //osETH
      '0xD9A442856C234a39a81a089C06451EBAa4306a72', //puffETH
      '0xae78736Cd615f374D3085123A210448E74Fc6393', //rETH
      '0x83F20F44975D03b1b09e64809B757c47f942BEeA', //sdai
      '0xac3E018457B222d93114458476f3E3416Abbe38F', //sfrxETH
      '0xf951E335afb289353dc249e82926178EaC7DEd78', //swETH
      '0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee', //weETH
      '0xDcEe70654261AF21C44c093C300eD3Bb97b78192', //woETH
      '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0', //wstETH
      '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110', //ezETH
      '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7', //rsETH
    ] }),
  },
  optimism: {
    tvl: sumTokensExport({ owners: ['0x9c44E6A927302dA33dd76abe4558f26e31C48019', '0xb44A251d1C31dd32700E5F2584B4282716C43EB3'], tokens: [
      "0x9Bcef72be871e61ED4fBbc7630889beE758eb81D", //RETH
      "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb" //wstETH
    ] }),
  },
  polygon: {
    tvl: sumTokensExport({ owners: ['0x77F4C841cb87fDFa43aB909cf56f7710Af648a8e', '0x77F4C841cb87fDFa43aB909cf56f7710Af648a8e', '0x77F4C841cb87fDFa43aB909cf56f7710Af648a8e', '0x9a1275304960dbc6a8d4a5795832823a7d53f30a'], tokens: [
      '0x0000000000000000000000000000000000001010', //MATIC
      '0x0E9b89007eEE9c958c0EDA24eF70723C2C93dD58', //ankrMATIC
      '0x77F4C841cb87fDFa43aB909cf56f7710Af648a8e', //ceMATIC
      '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4', // stMATIC
    ] }),
  },
  polygon_zkevm: {
    tvl: sumTokensExport({ owners: ['0x687B069759b053866715542f22877DA9091f20f5', '0x93402F1908dD009C857962b45278E71C7F63647f', '0x24318b8a0CBaCc61cAdE47e5457Eea7237EB2c0E'], tokens: [
      '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C', // ankrETH
      '0xb23C20EFcE6e24Acca0Cef9B7B7aA196b84EC942', //rETH
      '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9', //wstETH
    ] }),
  },
  mode: {
    tvl: sumTokensExport({ owners: ['0xafCA20A243e4e4936fAF76e8893128A231678677', '0xbD38B722480e2e3D540CaFC44A113d92E1015faa', '0xFdC5033b6Ef5DEDc6b5225B3Fbe3704C3F9638eE', '0xbfE8c19642929Ea9FfD1754e8DdAb880F05022f1'], tokens: [
      "0x2BE717340023C9e14C1Bb12cb3ecBcfd3c3fB038", //ionUSDC
      "0x2416092f143378750bb29b79eD961ab195CcEea5", //ezETH
      "0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3", //ionUSDT
      "0x04c0599ae5a44757c0af6f9ec3b93da8976c150a", //weETH
    ] }),
  },
  linea: {
    tvl: sumTokensExport({ owners: ['0x7CDb0b6217A568947D3A2585F0E8AF135017d608', '0xd9BE9956C822000cc0078C16C66B7dd83E6E07C4', '0x2770cB901e6d990B4F5C35E0732821eBf9d3acb7', '0x4F50E7D6A48D78D813775d7A36717DA6A058811D'], tokens: [
      "0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D", //meUSDC
      "0xf669C3C03D9fdF4339e19214A749E52616300E89", //meUSDT
      "0x2416092f143378750bb29b79eD961ab195CcEea5", //ezETH
      "0x1Bf74C010E6320bab11e2e5A532b5AC15e0b8aA6", //weETH
    ] }),
  },
}
