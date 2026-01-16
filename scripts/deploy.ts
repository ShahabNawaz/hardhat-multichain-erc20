import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);
  console.log(
    "Balance:",
    (await deployer.getBalance()).toString()
  ); // <-- closing parenthesis added here

  // const Token = await ethers.getContractFactory("MyToken");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log("Token deployed at:", token.address);

  const LoadTestingV2 = await ethers.getContractFactory("LoadTestingV2");
  const loadTestingV2 = await LoadTestingV2.deploy();
  await loadTestingV2.deployed();
  console.log("LoadTestingV2 deployed at:", loadTestingV2.address);

  // const TokenCaller = await ethers.getContractFactory("TokenCaller");
  // const caller = await TokenCaller.deploy();
  // await caller.deployed();
  // console.log("TokenCaller deployed at:", caller.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
