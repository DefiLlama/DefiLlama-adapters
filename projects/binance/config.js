const ADDRESSES = require('../helper/coreAssets.json')

const { getUniqueAddresses } = require('../helper/utils')

// taken from https://www.binance.com/en/blog/community/our-commitment-to-transparency-2895840147147652626
const assetList = [
  ['1INCH', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['1INCH', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['1INCH', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['1INCH', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['1INCH', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['1INCH', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['1INCH', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['1INCH', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['APT', 'APT', '0x5bd7de5c56d5691f32ea86c973c73fec7b1445e59736c97158020018c080bb00'],
  ['APT', 'APT', '0x80174e0fe8cb2d32b038c6c888dd95c3e1560736f0d4a6e8bed6ae43b5c91f6f'],
  ['APT', 'APT', '0xae1a6f3d3daccaf77b55044cea133379934bba04a11b9d0bbd643eae5e6e9c70'],
  ['APT', 'APT', '0xd91c64b777e51395c6ea9dec562ed79a4afa0cd6dad5a87b187c37198a1f855a'],
  ['APT', 'APT', '0xed8c46bec9dbc2b23c60568f822b95b87ea395f7e3fdb5e3adc0a30c55c0a60e'],
  ['ARB', 'ARB', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['ARB', 'ARB', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['ARB', 'ARB', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['ARB', 'ARB', '0xb38e8c17e38363af6ebdcb3dae12e0243582891d'],
  ['ARB', 'ARB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ARB', 'ARB', '0x25681ab599b4e2ceea31f8b498052c53fc2d74db'],
  ['ARB', 'ARB', '0x3931dab967c3e2dbb492fe12460a66d0fe4cc857'],
  ['ARB', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['BNB', 'BEP2', 'bnb142q467df6jun6rt5u2ar58sp47hm5f9wvz2cvg'],
  ['BNB', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['BNB', 'BEP2', 'bnb1lsmt5a8vqqus5fwslx8pyyemgjtg4y6ugj308t'],
  ['BNB', 'BEP2', 'bnb1m5amny2gs3xdyta6pksmr43zu4727w24syyks7'],
  ['BNB', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['BNB', 'BEP2', 'bnb1xrfwzlu9c5208lhtn7ywt0mjrhjh4nt4fjyqxy'],
  ['BNB', 'BEP20', '0x01c952174c24e1210d26961d456a77a39e1f0bb0'],
  ['BNB', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['BNB', 'BEP20', '0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645'],
  ['BNB', 'BEP20', '0x1fbe2acee135d991592f167ac371f3dd893a508b'],
  ['BNB', 'BEP20', '0x29bdfbf7d27462a2d115748ace2bd71a2646946c'],
  ['BNB', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['BNB', 'BEP20', '0x515b72ed8a97f42c568d6a143232775018f133c8'],
  ['BNB', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['BNB', 'BEP20', '0x73f5ebe90f27b46ea12e5795d16c4b408b19cc6f'],
  ['BNB', 'BEP20', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['BNB', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['BNB', 'BEP20', '0xa180fe01b906a1be37be6c534a3300785b20d947'],
  ['BNB', 'BEP20', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['BNB', 'BEP20', '0xbd612a3f30dca67bf60a39fd0d35e39b7ab80774'],
  ['BNB', 'BEP20', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['BNB', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['BNB', 'BEP20', '0xdccf3b77da55107280bd850ea519df3705d1a75a'],
  ['BNB', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['BNB', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['BNB', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BNB', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['BNB', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['BNB', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['BNB', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BNB', 'OPBNB', '0x001ceb373c83ae75b9f5cf78fc2aba3e185d09e2'],
  ['BNB', 'OPBNB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BTC', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['BTC', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['BTC', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['BTC', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['BTC', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['BTC', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['BTC', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['BTC', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BTC', 'BTC', '1PJiGp2yDLvUgqeBsuZVCBADArNsk6XEiw'],
  ['BTC', 'BTC', '1Pzaqw98PeRfyHypfqyEgg5yycJRsENrE7'],
  ['BTC', 'BTC', '32bhzEniykYRFADVaRM5PYswsjC23cxtes'],
  ['BTC', 'BTC', '34GUzCVLbdkMQ2UdVTaA4nxPwoovVS7y2J'],
  ['BTC', 'BTC', '34HpHYiyQwg69gFmCq2BGHjF1DZnZnBeBP'],
  ['BTC', 'BTC', '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo'],
  ['BTC', 'BTC', '36zSLdRv1jyewjaC12fqK5fptn7PqewunL'],
  ['BTC', 'BTC', '38DN2uFMZPiHLHJigfv4kWC9JWJrNnhLcn'],
  ['BTC', 'BTC', '38Xnrq8MZiKmYmwobbYdZQ5nnCbX1qvQfE'],
  ['BTC', 'BTC', '395vnFScKQ1ay695C6v7gf89UzoFpx3WuJ'],
  ['BTC', 'BTC', '39884E3j6KZj82FK4vcCrkUvWYL5MQaS3v'],
  ['BTC', 'BTC', '3AQ8bAh88TQU7JV1H3ovXrwsuV6s3zYZuN'],
  ['BTC', 'BTC', '3AeUiDpPPUrUBS377584sFCpx8KLfpX9Ry'],
  ['BTC', 'BTC', '3CySuFKbBS29M7rE5iJakZRNqb3msMeFoN'],
  ['BTC', 'BTC', '3E97AjYaCq9QYnfFMtBCYiCEsN956Rvpj2'],
  ['BTC', 'BTC', '3FHNBLobJnbCTFTVakh5TXmEneyf5PT61B'],
  ['BTC', 'BTC', '3HdGoUTbcztBnS7UzY4vSPYhwr424CiWAA'],
  ['BTC', 'BTC', '3JFJPpH8Chwo7CDbyYQ4XcfgcjEP1FGRMJ'],
  ['BTC', 'BTC', '3JJmF63ifcamPLiAmLgG96RA599yNtY3EQ'],
  ['BTC', 'BTC', '3JqPhvKkAPcFB3oLELBT7z2tQdjpnxuDi9'],
  ['BTC', 'BTC', '3Jy7A2rThtU9xm4o8gR3a9pvQuxXnRNuNF'],
  ['BTC', 'BTC', '3LQUu4v9z6KNch71j7kbj8GPeAGUo1FW6a'],
  ['BTC', 'BTC', '3LcgLHzTvjLKBixBvkKGiadtiw2GBSKKqH'],
  ['BTC', 'BTC', '3LtrsjtyLsHoG8WQMe2RFw3de4pLTQZNcY'],
  ['BTC', 'BTC', '3M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6'],
  ['BTC', 'BTC', '3Me9QACjioepv2L2oKTC9QQ87NH6vFe1Zj'],
  ['BTC', 'BTC', '3NPL82eaehTFh4r3StpHqVQBTnZJFaGsyy'],
  ['BTC', 'BTC', '3NXCvmLGz9SxYi6TnjbBQfQMcwiZ1iQETa'],
  ['BTC', 'BTC', '3NjHh71XgjikBoTNYdWgXiNeZcLaKNThgb'],
  ['BTC', 'BTC', '3Qxak1CZhLyZ7GVckKphLURdLBCjMfz9bA'],
  ['BTC', 'BTC', 'bc1q32lyrhp9zpww22phqjwwmelta0c8a5q990ghs6'],
  ['BTC', 'BTC', 'bc1q78ufzeu8w8fwvxuphrdlg446xhyptf28fkatu5'],
  ['BTC', 'BTC', 'bc1q7t9fxfaakmtk8pj7tdxjvwsng6y9x76czuaf5h'],
  ['BTC', 'BTC', 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h'],
  ['BTC', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['BTC', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['BTC', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['BTC', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BUSD', 'AVAX', '0x9f8c163cba728e99993abe7495f06c0a3c8ac8b9'],
  ['BUSD', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['BUSD', 'BEP2', 'bnb1m5amny2gs3xdyta6pksmr43zu4727w24syyks7'],
  ['BUSD', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['BUSD', 'BEP2', 'bnb1xrfwzlu9c5208lhtn7ywt0mjrhjh4nt4fjyqxy'],
  ['BUSD', 'BEP20', '0x01c952174c24e1210d26961d456a77a39e1f0bb0'],
  ['BUSD', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['BUSD', 'BEP20', '0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645'],
  ['BUSD', 'BEP20', '0x1fbe2acee135d991592f167ac371f3dd893a508b'],
  ['BUSD', 'BEP20', '0x29bdfbf7d27462a2d115748ace2bd71a2646946c'],
  ['BUSD', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['BUSD', 'BEP20', '0x515b72ed8a97f42c568d6a143232775018f133c8'],
  ['BUSD', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['BUSD', 'BEP20', '0x73f5ebe90f27b46ea12e5795d16c4b408b19cc6f'],
  ['BUSD', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['BUSD', 'BEP20', '0xa180fe01b906a1be37be6c534a3300785b20d947'],
  ['BUSD', 'BEP20', '0xbd612a3f30dca67bf60a39fd0d35e39b7ab80774'],
  ['BUSD', 'BEP20', '0xdccf3b77da55107280bd850ea519df3705d1a75a'],
  ['BUSD', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['BUSD', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['BUSD', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['BUSD', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['BUSD', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['BUSD', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['BUSD', 'ETH', '0x9696f59e4d72e237be84ffd425dcad154bf96976'],
  ['BUSD', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['BUSD', 'MATIC', '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245'],
  ['BUSD', 'OP', '0xacd03d601e5bb1b275bb94076ff46ed9d753435a'],
  ['BUSD', 'TRX', 'TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf'],
  ['BUSD', 'TRX', 'TNXoiAJ3dct8Fjg4M9fkLFh9S2v9TXc32G'],
  ['CHR', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['CHR', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['CHR', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['CHR', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['CHR', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['CHR', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['CHR', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['CHR', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['CHR', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['CHR', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['CHZ', 'BEP2', 'bnb142q467df6jun6rt5u2ar58sp47hm5f9wvz2cvg'],
  ['CHZ', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['CHZ', 'BEP2', 'bnb1m5amny2gs3xdyta6pksmr43zu4727w24syyks7'],
  ['CHZ', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['CHZ', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['CHZ', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['CHZ', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['CHZ', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['CHZ', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['CHZ', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['CRV', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['CRV', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['CRV', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['CRV', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['CVP', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['CVP', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['CVP', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['CVP', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['CVP', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['CVP', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['CVP', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['CVP', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['DOGE', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['DOGE', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['DOGE', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['DOGE', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['DOGE', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['DOGE', 'BEP20', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['DOGE', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['DOGE', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['DOGE', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  /*
  ['DOGE', 'DOGE', 'D73RQLGWW9TBT2AKspEP24wLiXFrXvnTqX'],
  ['DOGE', 'DOGE', 'D7BrtudMAdwz2U7vSGumVDuxZsZNibJuzw'],
  ['DOGE', 'DOGE', 'D7D2f2WuEkwhTWqBkisZ5sM3JagaBcNWBs'],
  ['DOGE', 'DOGE', 'D7JLeAgZK2TyFRFtjKwHMxhFjWvJ9gS5kj'],
  ['DOGE', 'DOGE', 'D7QZnXec5bkMyokPFPh6v4WAw5VF5TocAy'],
  ['DOGE', 'DOGE', 'D7bg2iUG3UiHuTWjRqcjdJiEjHrsFASsjw'],
  ['DOGE', 'DOGE', 'D7dm1b8DEqaCxcgaPuBXz9FqjAQ7UTK6sz'],
  ['DOGE', 'DOGE', 'DAYthKnkrWUHRENvtBwjemi6kFzk4K9SMr'],
  ['DOGE', 'DOGE', 'DB7cLf6DRuHgTasXPgAEtkFVBnehgDjo9v'],
  ['DOGE', 'DOGE', 'DCqD9gyq3qumbeEJZKc2Tm2R96JEd9dSDe'],
  ['DOGE', 'DOGE', 'DCxFJEWsYJFnC3HP7YfZdsd3X43ttQA79Z'],
  ['DOGE', 'DOGE', 'DD1h9ojoyAdAGLXaqgqZP3j86AtxZs6jCn'],
  ['DOGE', 'DOGE', 'DD6K5pfaPd93ri5x67PzVVUS8Cui3rRoBe'],
  ['DOGE', 'DOGE', 'DE5opaXjFgDhFBqL6tBDxTAQ56zkX6EToX'],
  ['DOGE', 'DOGE', 'DEvUEF9VrXbKf5rdaQCUzeh4MvZxd3Zx5T'],
  ['DOGE', 'DOGE', 'DFyohYD3bMXCEg1TdMfdy1J7dYfK4shhPf'],
  ['DOGE', 'DOGE', 'DGYUcgNQAAMzXynRHJJVAKkgXWhSddJNi2'],
  ['DOGE', 'DOGE', 'DGiYKUGbzRtppwdoinym7ZJXWuBqBuHxUk'],
  ['DOGE', 'DOGE', 'DGmd2jn1D7oLXpdpcGkLaGLDMbnRt4qkH3'],
  ['DOGE', 'DOGE', 'DHiKVUMdaAm43NMh2wMSfn7xtmUmfKSSNE'],
  ['DOGE', 'DOGE', 'DJRaDXkewtLgwL9EZyTkWQEsxuyBUaveKU'],
  ['DOGE', 'DOGE', 'DJfU2p6woQ9GiBdiXsWZWJnJ9uDdZfSSNC'],
  ['DOGE', 'DOGE', 'DLqwvgk27ACJnHPEGxyDfspieHBVYJRZiC'],
  ['DOGE', 'DOGE', 'DN9NrgYzgh6AtNmTUFThqRxhbyoNWhG6iD'],
  ['DOGE', 'DOGE', 'DPAMdZsSirVBGeDR9sE1LJXkwG6AQSNAMW'],
  ['DOGE', 'DOGE', 'DPKKpanH1hMVzdWb2oi126znjruvvGRQzj'],
  ['DOGE', 'DOGE', 'DPNqMsW1rotjhCzcbBEXzK3W73DiyzVLYc'],
  ['DOGE', 'DOGE', 'DPjAgjrEYTc7RzN3E19sDLrAhRt7DrTTmd'],
  ['DOGE', 'DOGE', 'DQYqMYmQCfL2eDLmMXV5uvCPkN6Vv4KtSx'],
  ['DOGE', 'DOGE', 'DQkwksfYrAWAR9tRcqygA5pihmnURozxzo'],
  ['DOGE', 'DOGE', 'DQnhnNxW89AkFHDsT6aWHim4DvtzwF9sGo'],
  ['DOGE', 'DOGE', 'DRuYd74gqPuQD9HKEBDxRr9gSogQmdj9DH'],
  ['DOGE', 'DOGE', 'DRweGdMgohChLBn2TamjCNicKYEncRgj5a'],
  ['DOGE', 'DOGE', 'DTGrjpvJXQU2zSpUDsnk9b4PAQW5Pwtg4K'],
  ['DOGE', 'DOGE', 'DTSop4ycWkpmDqpncVZ3jwKp3z7B4kW4T3'],
  ['DOGE', 'DOGE', 'DTbG3RJRejnM99g8MSnhSbJxJVW8X7YXy9'],
  ['DOGE', 'DOGE', 'DU8gPC5mh4KxWJARQRxoESFark2jAguBr5'],
  */
  ['DOT', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['DOT', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['DOT', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['DOT', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['DOT', 'BEP20', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['DOT', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['DOT', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['DOT', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['DOT', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['DOT', 'DOT', '13VagdYbCRMSBSbmz4UivPpS9SwmTTRiPtMkjoEHRm8vAkqv'],
  ['DOT', 'DOT', '16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD'],
  ['DOT', 'DOT', '1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF'],
  ['DOT', 'DOT', '1P6bgxZi42kYYV545c3RSp7NJLUgASDpMP1ifXJazVR1e2N'],
  ['DOT', 'DOT', '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7'],
  ['DOT', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['DOT', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['DOT', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['DOT', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ENJ', 'ENJ', 'enC1zkqfU5X4x84LMKSzcRdsSSiF7M1Nt7ovm62jRXr78uT1h'],
  ['ENJ', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['ENJ', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['ENJ', 'ETH', '0x56eddb7aa87536c09ccc2793473599fd21a8b17f'],
  ['ENJ', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['ETH', 'ARB', '0x1b5b4e441f5a22bfd91b7772c780463f66a74b35'],
  ['ETH', 'ARB', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['ETH', 'ARB', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['ETH', 'ARB', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['ETH', 'ARB', '0xb38e8c17e38363af6ebdcb3dae12e0243582891d'],
  ['ETH', 'ARB', '0xf92402bb795fd7cd08fb83839689db79099c8c9c'],
  ['ETH', 'ARB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ETH', 'BASE', '0x3304e22ddaa22bcdc5fca2269b418046ae7b566a'],
  ['ETH', 'BASE', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ETH', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['ETH', 'BEP2', 'bnb1m5amny2gs3xdyta6pksmr43zu4727w24syyks7'],
  ['ETH', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['ETH', 'BEP2', 'bnb1xrfwzlu9c5208lhtn7ywt0mjrhjh4nt4fjyqxy'],
  ['ETH', 'BEP20', '0x01c952174c24e1210d26961d456a77a39e1f0bb0'],
  ['ETH', 'BEP20', '0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645'],
  ['ETH', 'BEP20', '0x29bdfbf7d27462a2d115748ace2bd71a2646946c'],
  ['ETH', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['ETH', 'BEP20', '0x515b72ed8a97f42c568d6a143232775018f133c8'],
  ['ETH', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['ETH', 'BEP20', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['ETH', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['ETH', 'BEP20', '0xa180fe01b906a1be37be6c534a3300785b20d947'],
  ['ETH', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['ETH', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['ETH', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ETH', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['ETH', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['ETH', 'ETH', '0x4976a4a02f38326660d17bf34b431dc6e2eb2327'],
  ['ETH', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['ETH', 'ETH', '0x56eddb7aa87536c09ccc2793473599fd21a8b17f'],
  ['ETH', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['ETH', 'ETH', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['ETH', 'ETH', '0x9696f59e4d72e237be84ffd425dcad154bf96976'],
  ['ETH', 'ETH', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['ETH', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['ETH', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['ETH', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['ETH', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ETH', 'MANTA', '0x3cdfb47b0e910d9190ed788726cd72489bf10499'],
  ['ETH', 'MANTA', '0x923fc76cb13a14e5a87843d309c9f401ec498e2d'],
  ['ETH', 'MANTA', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['ETH', 'OP', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['ETH', 'OP', '0xacd03d601e5bb1b275bb94076ff46ed9d753435a'],
  ['ETH', 'OP', '0xf977814e90da44bfa03b6295a0616a897441acec'],
 // ['ETH', 'STK', ' 0x0213c67ed78bc280887234fe5ed5e77272465317978ae86c25a71531d9332a2d'],
  ['ETH', 'ERA', '0x7aed074ca56f5050d5a2e512ecc5bf7103937d76'],
  ['ETH', 'ERA', '0xa84fd90d8640fa63d194601e0b2d1c9094297083'],
  ['ETH', 'ERA', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['FDUSD', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['FDUSD', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['FDUSD', 'BEP20', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['FDUSD', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['FDUSD', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['FDUSD', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['FDUSD', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['FDUSD', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['FDUSD', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['FDUSD', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['FDUSD', 'ETH', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['FDUSD', 'ETH', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['FDUSD', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['FDUSD', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['FDUSD', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['FDUSD', 'OPBNB', '0x001ceb373c83ae75b9f5cf78fc2aba3e185d09e2'],
  ['FDUSD', 'OPBNB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['GRT', 'ARB', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['GRT', 'ARB', '0xb38e8c17e38363af6ebdcb3dae12e0243582891d'],
  ['GRT', 'ARB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['GRT', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['GRT', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['GRT', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['GRT', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['GRT', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['GRT', 'MATIC', '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245'],
  ['GRT', 'MATIC', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['HFT', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['HFT', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['HFT', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['HFT', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['HFT', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['HFT', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['HFT', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['HFT', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['HFT', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['LINK', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['LINK', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['LINK', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['LINK', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['LINK', 'BEP20', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['LINK', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['LINK', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['LINK', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['LINK', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['LINK', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['LINK', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['LINK', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['LINK', 'ETH', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['LINK', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['LINK', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['LINK', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['LTC', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['LTC', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['LTC', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['LTC', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['LTC', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['LTC', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['LTC', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['LTC', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['LTC', 'LTC', 'LZEjckteAtWrugbsy9zU8VHEZ4iUiXo9Nm'],
  ['LTC', 'LTC', 'LbmGksLBwtwRXyxeazCZqKiAHX6cWN2AzN'],
  ['LTC', 'LTC', 'LhzEoDXHXASi4hSMxrKeVoSGrED9QsBpPq'],
  ['LTC', 'LTC', 'M8T1B2Z97gVdvmfkQcAtYbEepune1tzGua'],
  ['LTC', 'LTC', 'MEhAHYijouCinmGKL6n1bRTXYznH1X24rD'],
  ['LTC', 'LTC', 'MG9aFQgTH5C4UPcur8S2bh5duKYMfaJFUS'],
  ['LTC', 'LTC', 'MGvUTN1PuWgBxuoFgTfkk4eJDzYgRivR8F'],
  ['LTC', 'LTC', 'MJto5wFLrE9t4TDXCgdSet8W6mxYqGijC3'],
  ['LTC', 'LTC', 'MJwFHGandYUFJTTHHSXg3q6u7ge4af1n4N'],
  ['LTC', 'LTC', 'MLjHNHuJy8VxxPzkL2MmYNoxG8b6BH4J4R'],
  ['LTC', 'LTC', 'MQd1fJwqBJvwLuyhr17PhEFx1swiqDbPQS'],
  ['LTC', 'LTC', 'MSeDRiNoH5Afr9b9rNo837hYzpxBXXqMZf'],
  ['LTC', 'LTC', 'MWGTiJBNEQSfxTCrdC2VKEa55Lck27wr67'],
  ['MASK', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['MASK', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['MASK', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['MASK', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['MASK', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['MASK', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['MASK', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['MATIC', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['MATIC', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['MATIC', 'BEP2', 'bnb1xrfwzlu9c5208lhtn7ywt0mjrhjh4nt4fjyqxy'],
  ['MATIC', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['MATIC', 'BEP20', '0x29bdfbf7d27462a2d115748ace2bd71a2646946c'],
  ['MATIC', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['MATIC', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['MATIC', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['MATIC', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['MATIC', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['MATIC', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['MATIC', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['MATIC', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['MATIC', 'ETH', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['MATIC', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['MATIC', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['MATIC', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['MATIC', 'MATIC', '0x082489a616ab4d46d1947ee3f912e080815b08da'],
  ['MATIC', 'MATIC', '0x290275e3db66394c52272398959845170e4dcb88'],
  ['MATIC', 'MATIC', '0x417850c1cd0fb428eb63649e9dc4c78ede9a34e8'],
  ['MATIC', 'MATIC', '0x505e71695e9bc45943c58adec1650577bca68fd9'],
  ['MATIC', 'MATIC', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['MATIC', 'MATIC', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['MATIC', 'MATIC', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['MATIC', 'MATIC', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['MATIC', 'MATIC', '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245'],
  ['MATIC', 'MATIC', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['OP', 'OP', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['OP', 'OP', '0xacd03d601e5bb1b275bb94076ff46ed9d753435a'],
  ['OP', 'OP', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['SHIB', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['SHIB', 'BEP20', '0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645'],
  ['SHIB', 'BEP20', '0x1fbe2acee135d991592f167ac371f3dd893a508b'],
  ['SHIB', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['SHIB', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['SHIB', 'BEP20', '0xbd612a3f30dca67bf60a39fd0d35e39b7ab80774'],
  ['SHIB', 'BEP20', '0xdccf3b77da55107280bd850ea519df3705d1a75a'],
  ['SHIB', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['SHIB', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['SHIB', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['SHIB', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['SHIB', 'ETH', '0x4976a4a02f38326660d17bf34b431dc6e2eb2327'],
  ['SHIB', 'ETH', '0x56eddb7aa87536c09ccc2793473599fd21a8b17f'],
  ['SHIB', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['SHIB', 'ETH', '0x835678a611b28684005a5e2233695fb6cbbb0007'],
  ['SHIB', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['SHIB', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['SOL', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['SOL', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['SOL', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['SOL', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['SOL', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['SOL', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['SOL', 'SOL', '28nYGHJyUVcVdxZtzKByBXEj127XnrUkrE3VaGuWj1ZU'],
  ['SOL', 'SOL', '2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S'],
  ['SOL', 'SOL', '3gd3dqgtJ4jWfBfLYTX67DALFetjc5iS72sCgRhCkW2u'],
  ['SOL', 'SOL', '3yFwqXBfZY4jBVUafQ1YEXw189y2dN3V5KQq9uzBDy1E'],
  ['SOL', 'SOL', '5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9'],
  ['SOL', 'SOL', '6QJzieMYfp7yr3EdrePaQoG3Ghxs2wM98xSLRu8Xh56U'],
  ['SOL', 'SOL', '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'],
  ['SOL', 'SOL', 'BZ3kabSsMzbuJUguYxtmkRtzw7ACqw1DUMH8PcbvXiUr'],
  ['SOL', 'SOL', 'HXsKP7wrBWaQ8T2Vtjry3Nj3oUgwYcqq9vrHDM12G664'],
  ['SSV', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['SSV', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['SSV', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['SSV', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['SSV', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['SSV', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['TUSD', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['TUSD', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['TUSD', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['TUSD', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['TUSD', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['TUSD', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['TUSD', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['TUSD', 'TRX', 'TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf'],
  ['TUSD', 'TRX', 'TNXoiAJ3dct8Fjg4M9fkLFh9S2v9TXc32G'],
  ['TUSD', 'TRX', 'TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb'],
  ['UNI', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['UNI', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['UNI', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['UNI', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['UNI', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['UNI', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['UNI', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['UNI', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['UNI', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['UNI', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['UNI', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['UNI', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['UNI', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['UNI', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDC', 'ALGO', 'MTCEM5YJJSYGW2RCXYXGE4SXLSPUUEJKQAWG2GUX6CNN72KQ3XPJCM6NOI'],
  ['USDC', 'ALGO', 'QYXDGS2XJJT7QNR6EJ2YHNZFONU6ROFM6BKTBNVT63ZXQ5OC6IYSPNDJ4U'],
  ['USDC', 'ARB', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDC', 'ARB', '0xb38e8c17e38363af6ebdcb3dae12e0243582891d'],
  ['USDC', 'ARB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDC', 'AVAX', '0x4aefa39caeadd662ae31ab0ce7c8c2c9c0a013e8'],
  ['USDC', 'AVAX', '0x9f8c163cba728e99993abe7495f06c0a3c8ac8b9'],
  ['USDC', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['USDC', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['USDC', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['USDC', 'BEP20', '0x1fbe2acee135d991592f167ac371f3dd893a508b'],
  ['USDC', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['USDC', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDC', 'BEP20', '0x73f5ebe90f27b46ea12e5795d16c4b408b19cc6f'],
  ['USDC', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['USDC', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['USDC', 'BEP20', '0xdccf3b77da55107280bd850ea519df3705d1a75a'],
  ['USDC', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['USDC', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['USDC', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDC', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['USDC', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['USDC', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['USDC', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['USDC', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['USDC', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['USDC', 'MATIC', '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245'],
  ['USDC', 'NEAR', '5c33c6218d47e00ef229f60da78d0897e1ee9665312550b8afd5f9c7bc6957d2'],
  ['USDC', 'NEAR', 'binancecold3.near'],
  ['USDC', 'OP', '0xacd03d601e5bb1b275bb94076ff46ed9d753435a'],
  ['USDC', 'SOL', '2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S'],
  ['USDC', 'SOL', '5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9'],
  ['USDC', 'SOL', '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'],
  ['USDC', 'TRX', 'TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf'],
  ['USDC', 'TRX', 'TKoMMAMrDCUY212N6M4pzmYABtgkgo7XZn'],
  ['USDC', 'TRX', 'TNXoiAJ3dct8Fjg4M9fkLFh9S2v9TXc32G'],
  ['USDC', 'TRX', 'TVGDpgtCs45PJE7ZMHhiC76L3v77qAwJW9'],
  ['USDC', 'XLM', 'GBAIA5U6E3FSRUW55AXACIVGX2QR5JYAS74OWLED3S22EGXVYEHPLGPA'],
  ['USDC', 'XLM', 'GC5LF63GRVIT5ZXXCXLPI3RX2YXKJQFZVBSAO6AUELN3YIMSWPD6Z6FH'],
  ['USDT', 'ARB', '0xb38e8c17e38363af6ebdcb3dae12e0243582891d'],
  ['USDT', 'ARB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'AVAX', '0x4aefa39caeadd662ae31ab0ce7c8c2c9c0a013e8'],
  ['USDT', 'AVAX', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDT', 'AVAX', '0x9f8c163cba728e99993abe7495f06c0a3c8ac8b9'],
  ['USDT', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['USDT', 'BEP2', 'bnb1m5amny2gs3xdyta6pksmr43zu4727w24syyks7'],
  ['USDT', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['USDT', 'BEP2', 'bnb1xrfwzlu9c5208lhtn7ywt0mjrhjh4nt4fjyqxy'],
  ['USDT', 'BEP20', '0x01c952174c24e1210d26961d456a77a39e1f0bb0'],
  ['USDT', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['USDT', 'BEP20', '0x161ba15a5f335c9f06bb5bbb0a9ce14076fbb645'],
  ['USDT', 'BEP20', '0x1fbe2acee135d991592f167ac371f3dd893a508b'],
  ['USDT', 'BEP20', '0x29bdfbf7d27462a2d115748ace2bd71a2646946c'],
  ['USDT', 'BEP20', '0x3c783c21a0383057d128bae431894a5c19f9cf06'],
  ['USDT', 'BEP20', '0x515b72ed8a97f42c568d6a143232775018f133c8'],
  ['USDT', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDT', 'BEP20', '0x73f5ebe90f27b46ea12e5795d16c4b408b19cc6f'],
  ['USDT', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['USDT', 'BEP20', '0xa180fe01b906a1be37be6c534a3300785b20d947'],
  ['USDT', 'BEP20', '0xbd612a3f30dca67bf60a39fd0d35e39b7ab80774'],
  ['USDT', 'BEP20', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['USDT', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['USDT', 'BEP20', '0xdccf3b77da55107280bd850ea519df3705d1a75a'],
  ['USDT', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['USDT', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['USDT', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['USDT', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['USDT', 'ETH', '0x4a9e49a45a4b2545cb177f79c7381a30e1dc261f'],
  ['USDT', 'ETH', '0x56eddb7aa87536c09ccc2793473599fd21a8b17f'],
  ['USDT', 'ETH', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDT', 'ETH', '0x9696f59e4d72e237be84ffd425dcad154bf96976'],
  ['USDT', 'ETH', '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d'],
  ['USDT', 'ETH', '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8'],
  ['USDT', 'ETH', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['USDT', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['USDT', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'MATIC', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['USDT', 'MATIC', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['USDT', 'MATIC', '0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245'],
  ['USDT', 'MATIC', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'OPBNB', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'OP', '0xacd03d601e5bb1b275bb94076ff46ed9d753435a'],
  ['USDT', 'OP', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['USDT', 'SOL', '2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S'],
  ['USDT', 'SOL', '5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9'],
  ['USDT', 'SOL', '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'],
  ['USDT', 'TRX', 'TAzsQ9Gx8eqFNFSKbeXrbi45CuVPHzA8wr'],
  ['USDT', 'TRX', 'TDqSquXBgUCLYvYC4XZgrprLK589dkhSCf'],
  ['USDT', 'TRX', 'TJCo98saj6WND61g1uuKwJ9GMWMT9WkJFo'],
  ['USDT', 'TRX', 'TJDENsfBJs4RFETt1X1W8wMDc8M5XnJhCe'],
  ['USDT', 'TRX', 'TKoMMAMrDCUY212N6M4pzmYABtgkgo7XZn'],
  ['USDT', 'TRX', 'TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireY9'],
  ['USDT', 'TRX', 'TMwf7KT8CCdUKuZfKNPTTjbYkFb3eGRbzY'],
  ['USDT', 'TRX', 'TNXoiAJ3dct8Fjg4M9fkLFh9S2v9TXc32G'],
  ['USDT', 'TRX', 'TQrY8tryqsYVCYS3MFbtffiPp2ccyn4STm'],
  ['USDT', 'TRX', 'TRGCqsUXeynKTgynp2j9g3sg7Nux2KtB3u'],
  ['USDT', 'TRX', 'TVGDpgtCs45PJE7ZMHhiC76L3v77qAwJW9'],
  ['USDT', 'TRX', 'TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb'],
  ['USDT', 'TRX', 'TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS'],
  ['WRX', 'BEP2', 'bnb142q467df6jun6rt5u2ar58sp47hm5f9wvz2cvg'],
  ['WRX', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['WRX', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['WRX', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['WRX', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['WRX', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['WRX', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['WRX', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['WRX', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['WRX', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['XRP', 'BEP2', 'bnb1fnd0k5l4p3ck2j9x9dp36chk059w977pszdgdz'],
  ['XRP', 'BEP2', 'bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn'],
  ['XRP', 'BEP20', '0x0e4158c85ff724526233c1aeb4ff6f0c46827fbe'],
  ['XRP', 'BEP20', '0x5a52e96bacdabb82fd05763e25335261b270efcb'],
  ['XRP', 'BEP20', '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'],
  ['XRP', 'BEP20', '0xbd612a3f30dca67bf60a39fd0d35e39b7ab80774'],
  ['XRP', 'BEP20', '0xd3a22590f8243f8e83ac230d1842c9af0404c4a1'],
  ['XRP', 'BEP20', '0xe2fc31f816a9b94326492132018c3aecc4a93ae1'],
  ['XRP', 'BEP20', '0xeb2d2f1b8c558a40207669291fda468e50c8a0bb'],
  ['XRP', 'BEP20', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['XRP', 'ETH', '0x21a31ee1afc51d94c2efccaa2092ad1028285549'],
  ['XRP', 'ETH', '0x28c6c06298d514db089934071355e5743bf21d60'],
  ['XRP', 'ETH', '0xdfd5293d8e347dfe59e90efd55b2956a1343963d'],
  ['XRP', 'ETH', '0xf977814e90da44bfa03b6295a0616a897441acec'],
  ['XRP', 'XRP', 'rBtttd61FExHC68vsZ8dqmS3DfjFEceA1A'],
  ['XRP', 'XRP', 'rDAE53VfMvftPB4ogpWGWvzkQxfht6JPxr'],
  ['XRP', 'XRP', 'rDecw8UhrZZUiaWc91e571b3TL41MUioh7'],
  ['XRP', 'XRP', 'rEy8TFcrAPvhpKrwyrscNYyqBGUkE9hKaJ'],
  ['XRP', 'XRP', 'rNU4eAowPuixS5ZCWaRL72UUeKgxcKExpK'],
  ['XRP', 'XRP', 'rP3mUZyCDzZkTSd1VHoBbFt8HGm8fyq8qV'],
  ['XRP', 'XRP', 'rPJ5GFpyDLv7gqeB1uZVUBwDwi41kaXN5A'],
  ['XRP', 'XRP', 'rPz2qA93PeRCyHyFCqyNggnyycJR1N4iNf'],
  ['XRP', 'XRP', 'rarG6FaeYhnzSKSS5EEPofo4gFsPn2bZKk'],
  ['XRP', 'XRP', 'rfQ9EcLkU6WnNmkS3EwUkFeXeN47Rk8Cvi'],
  ['XRP', 'XRP', 'rhWj9gaovwu2hZxYW7p388P8GRbuXFLQkK'],
  ['XRP', 'XRP', 'rpmxpWis42eYV4oMhyxJNSzrLRdacJVooa'],
  ['XRP', 'XRP', 'rs8ZPbYqgecRcDzQpJYAMhSxSi5htsjnza'],  
]

function getAddresses(chain) {
  return assetList.filter(i => i[1] === chain).map(i => i[2])
}
function getOwners(chain) {
  const isCaseSensitive = ['BTC', 'TRX', 'SOL', 'XRP', 'LTC', 'DOT', 'ALGO', 'DOGE'].includes(chain)
  return getUniqueAddresses(assetList.filter(i => i[1] === chain).map(i => i[2]), isCaseSensitive)
}

module.exports = {
  bitcoin: {
    owners: getAddresses('BTC'),
  },
  ethereum: {
    owners: getOwners('ETH'),
    blacklistedTokens: [
      '0x9be89d2a4cd102d8fecc6bf9da793be995c22541', // BBTC
      ADDRESSES.ethereum.BNB, // WBNB
    ]
  },
  bsc: {
    owners: getOwners('BEP20'),
    tokens: [
      ADDRESSES.null,
      ADDRESSES.bsc.TUSD
    ],
  },
  bep2: {
    geckoId: 'binancecoin',
    owners: getAddresses('BEP2'),
  },
  tron: {
    owners: getOwners('TRX'),
  },
  avax: {
    owners: getOwners('AVAX'),
  },
  arbitrum: {
    owners: getOwners('ARB'),
  },
  litecoin: {
    owners: getOwners('LTC')
  },
  polygon: {
    owners: getOwners('MATIC')
  },
  optimism: {
    owners: getOwners('OP')
  },
  ripple: {
    owners: getOwners('XRP')
  },
  solana: {
    owners: getOwners('SOL')
  },
  polkadot: {
    owners: getOwners('DOT')
  },
  algorand: {
    owners: getOwners('ALGO')
  },
  aptos: {
    owners: getOwners('APT')
  },
  fantom: {
    owners: getOwners('FTM')
  },
  base: {
    owners: getOwners('BASE')
  },
  era: {
    owners: getOwners('ERA')
  },
  manta: {
    owners: getOwners('MANTA')
  },
  starknet: {
    owners: getOwners('STK')
  },
  op_bnb: {
    owners: getOwners('OPBNB')
  },
  near: {
    owners: getOwners('NEAR')
  },
  /*
  doge: {
    owners: getOwners('DOGE')
  },
  */
}