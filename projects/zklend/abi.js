const market = [
    {
      "name": "get_total_debt_for_token",
      "type": "function",
      "inputs": [
        {
          "name": "token",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "debt",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "customInput": "address"
    },
]
const marketAbi = {}
market.forEach(i => marketAbi[i.name] = i)
const staking = [
    {
      name: "core::integer::u256",
      type: "struct",
      members: [
        {
          name: "low",
          type: "core::integer::u128",
        },
        {
          name: "high",
          type: "core::integer::u128",
        },
      ],
    },
    {
      "type": "function",
      "name": "get_total_staked_amount",
      "inputs": [],
      "outputs": [
        {
          "type": "core::integer::u256"
        }
      ],
      "state_mutability": "view"
    },
]
const stakingAbi = {}
staking.forEach(i => stakingAbi[i.name] = i)

const erc20 = [{
  "name": "balanceOf",
  "type": "function",
  "inputs": [
    {
      "name": "account",
      "type": "felt"
    }
  ],
  "outputs": [
    {
      "name": "balance",
      "type": "Uint256"
    }
  ],
  "stateMutability": "view",
  "customInput": 'address',
}]
const erc20Abi = {}
erc20.forEach(i => erc20Abi[i.name] = i)

module.exports = {
  marketAbi,
  stakingAbi,
  erc20Abi
}