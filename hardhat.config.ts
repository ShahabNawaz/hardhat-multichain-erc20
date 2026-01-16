import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    sepolia: {
      url:
        process.env.SEPOLIA_RPC_URL ||
        "https://sepolia.infura.io/v3/cd172561a44f45e68dbf7df1313740ec",
      chainId: 11155111,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    optimismSepolia: {
      url: "https://sepolia.optimism.io",
      chainId: 11155420,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    baseSepolia: {
      url: "https://sepolia.base.org",
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    celoSepolia: {
      url: "https://forno.celo-sepolia.celo-testnet.org",
      chainId: 11142220,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },

  // Hardhat Verify 
etherscan: {
  apiKey: ETHERSCAN_API_KEY,
  customChains: [
    {
      network: "celoSepolia",
      chainId: 11142220,
      urls: {
        apiURL: "https://api.celoscan.io/api",
        browserURL: "https://celoscan.io",
      },
    },
    {
      network: "optimismSepolia",
      chainId: 11155420,
      urls: {
        apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
        browserURL: "https://sepolia-optimistic.etherscan.io",
      },
    },
  ],
},
};
export default config;
