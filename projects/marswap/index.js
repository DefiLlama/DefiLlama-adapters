const { getUniTVL } = require('../helper/unknownTokens');

module.exports = {
    bsc: {
        tvl: getUniTVL({ factory: '0xe19165248159B6cB2A2e35bF398581C777C9979A', useDefaultCoreAssets: true }),
    },
    ethereum: {
        tvl: getUniTVL({ factory: '0x5e763172d59b3b580af29a1c9fa4ac1cee69c5dd', useDefaultCoreAssets: true }),
    },
    shibarium: {
        tvl: async () => {
            const TVL_SHIBARIUM_V1 = await getUniTVL({ factory: '0xBe0223f65813C7c82E195B48F8AAaAcb304FbAe7', useDefaultCoreAssets: true });
            const TVL_SHIBARIUM_V2 = await getUniTVL({ factory: '0xd871a3f5d3bB9c00DDB0cC772690351B9712968D', useDefaultCoreAssets: true });
            return TVL_SHIBARIUM_V1.map((arrayV1, index) => arrayV1.concat(TVL_SHIBARIUM_V2[index]));
        },
    },
    base: {
        tvl: getUniTVL({ factory: '0xeE42fe6d6Be1eF43701DDAbc417AD22d82C5ecC3', useDefaultCoreAssets: true }),
    },
    cronos: {
        tvl: getUniTVL({ factory: '0xD716B78F0002C23190B024fc93C33CF73E30b8A6', useDefaultCoreAssets: true }),
    },
};


