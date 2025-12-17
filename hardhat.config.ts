// import { HardhatUserConfig } from "hardhat/config";
// import "@nomiclabs/hardhat-ethers";

// const config: HardhatUserConfig = {
//   solidity: "0.8.28",
// };

// export default config;


// import { HardhatUserConfig } from "hardhat/config";
// import "@nomiclabs/hardhat-ethers";
// import "dotenv/config";

// const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// const config: HardhatUserConfig = {
//   solidity: "0.8.28",
//   networks: {
//     amoy: {
//       url: "https://rpc-amoy.polygon.technology",
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//     },
//   },
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

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
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/cd172561a44f45e68dbf7df1313740ec",
      chainId: 11155111,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    optimismSepolia: {
    url: "https://sepolia.optimism.io",
    chainId: 11155420,
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

  },
};

export default config;
