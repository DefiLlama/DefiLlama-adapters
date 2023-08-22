const { getUniTVL } = require('../helper/unknownTokens')

module.exports = {
  misrepresentedTokens: true,
  core: {
    tvl: getUniTVL({
      useDefaultCoreAssets: true,
      factory: '0x23556027Ad3C3e76160AcA51e8098C395a6d815C',
    })
  }
}
