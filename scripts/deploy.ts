import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deployer:", deployer.address);

//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.deploy();
//   await token.deployed();
//   console.log("MyToken deployed at:", token.address);

//   const Caller = await ethers.getContractFactory("TokenCaller");
//   const caller = await Caller.deploy();
//   await caller.deployed();
//   console.log("TokenCaller deployed at:", caller.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);
  console.log(
    "Balance:",
    (await deployer.getBalance()).toString()
  );


  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed at:", token.address);


  const TokenCaller = await ethers.getContractFactory("TokenCaller");
  const caller = await TokenCaller.deploy();
  await caller.deployed();
  console.log("TokenCaller deployed at:", caller.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
