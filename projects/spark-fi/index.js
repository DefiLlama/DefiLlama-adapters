
const { aaveExports } = require('../helper/aave');

module.exports = {
  ethereum: aaveExports('ethereum', '0x03cFa0C4622FF84E50E75062683F44c9587e6Cc1', undefined, ["0xFc21d6d146E6086B8359705C8b28512a983db0cb"], { v3: true, blacklistedTokens: ['0x6b175474E89094C44Da98b954EedeAC495271d0f']})
};