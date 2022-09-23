const sdk = require("@defillama/sdk");
const target = '0x76BAc85e1E82cd677faa2b3f00C4a2626C4c6E32';
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

async function tvl(timestamp, block) {
    return { [ WETH ]: 
        (await sdk.api.eth.getBalance({ target, block })).output 
    };
};

module.exports = {
    methodology: "Tracks funds locked in the ERC20Peg contract on Ethereum",
    ethereum: {
        tvl
    }
}; // node test.js projects/cennz-bridge.js