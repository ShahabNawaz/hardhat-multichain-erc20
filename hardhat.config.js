// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     amoy: {
//       url: process.env.POLYGON_AMOY_RPC,
//       accounts: [process.env.PRIVATE_KEY],
//       chainId: 80002,
//     },
//   },
// };
console.log("USING hardhat.config.js");

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
    fuji: {
      url: process.env.AVALANCHE_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
