# Hardhat Multichain ERC20

A Hardhat-based project for creating, deploying, and interacting with ERC-20 tokens across multiple EVM-compatible test networks. This repository demonstrates multi-chain deployment, inter-contract interaction, balance checking, and token transfers using automated scripts.

## 🚀 Features

* ERC-20 token smart contract
* Secondary smart contract that interacts with the ERC-20 token
* Multi-chain deployment using a single `deploy.ts` script
* Token balance check and transfer functionality
* Dedicated transfer scripts for different chains
* Supports multiple EVM testnets

## 🌐 Supported Networks

* Polygon Amoy
* Ethereum Sepolia
* Avalanche Fuji

## 🛠️ Tech Stack

* Solidity
* Hardhat
* TypeScript
* Ethers.js

## 📁 Project Structure

```
├── contracts/
│   ├── MyERC20.sol            # ERC-20 token contract
│   └── TokenInteractor.sol    # Contract interacting with ERC-20
│
├── scripts/
│   ├── deploy.ts              # Deploy contracts to multiple chains
│   ├── transfer-amoy.ts       # Transfer tokens on Amoy
│   ├── transfer-sepolia.ts    # Transfer tokens on Sepolia
│   └── transfer-fuji.ts       # Transfer tokens on Avalanche Fuji
│
├── hardhat.config.ts
├── package.json
└── README.md
```

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/hardhat-multichain-erc20.git
cd hardhat-multichain-erc20
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following:

```env
PRIVATE_KEY=your_wallet_private_key
AMOY_RPC_URL=your_amoy_rpc_url
SEPOLIA_RPC_URL=your_sepolia_rpc_url
FUJI_RPC_URL=your_fuji_rpc_url
```

## 🔨 Compile Contracts

```bash
npx hardhat compile
```

## 🚀 Deploy Contracts

Deploy contracts to a specific network:

```bash
npx hardhat run scripts/deploy.ts --network amoy
npx hardhat run scripts/deploy.ts --network sepolia
npx hardhat run scripts/deploy.ts --network fuji
```

## 🔄 Transfer Tokens

Use the chain-specific transfer scripts:

```bash
npx hardhat run scripts/transfer-amoy.ts --network amoy
npx hardhat run scripts/transfer-sepolia.ts --network sepolia
npx hardhat run scripts/transfer-fuji.ts --network fuji
```

## 📌 What This Project Demonstrates

* Deploying ERC-20 contracts on multiple chains
* Interacting with deployed contracts using Hardhat scripts
* Checking token balances programmatically
* Transferring ERC-20 tokens across accounts
* Writing reusable deployment and interaction scripts

## 🧪 Networks Purpose

This project is intended for **learning and testing only**. All deployments are done on test networks.

## 📜 License
  
MIT License

---

⭐ If you find this project helpful, consider starring the repository!
