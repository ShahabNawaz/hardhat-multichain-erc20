// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying with account:", deployer.address);
//   console.log(
//     "Balance:",
//     (await deployer.getBalance()).toString()
//   ); // <-- closing parenthesis added here

//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.deploy();
//   await token.deployed();
//   console.log("Token deployed at:", token.address);

//   const LoadTestingV2 = await ethers.getContractFactory("LoadTestingV2");
//   const loadTestingV2 = await LoadTestingV2.deploy();
//   await loadTestingV2.deployed();
//   console.log("LoadTestingV2 deployed at:", loadTestingV2.address);

//   // const TokenCaller = await ethers.getContractFactory("TokenCaller");
//   // const caller = await TokenCaller.deploy();
//   // await caller.deployed();
//   // console.log("TokenCaller deployed at:", caller.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });







// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying with account:", deployer.address);

//   const balance = await ethers.provider.getBalance(deployer.address);
//   console.log("Balance:", ethers.formatEther(balance));

//   // Deploy MyToken
//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.deploy();
//   await token.waitForDeployment();

//   console.log("Token deployed at:", await token.getAddress());

//   // Deploy LoadTestingV2
//   const LoadTestingV2 = await ethers.getContractFactory("LoadTestingV2");
//   const loadTestingV2 = await LoadTestingV2.deploy();
//   await loadTestingV2.waitForDeployment();

//   console.log(
//     "LoadTestingV2 deployed at:",
//     await loadTestingV2.getAddress()
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });




import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance));

  // Correct contract factory
  const WebhookTest = await ethers.getContractFactory("WebhookTest");

  // Correct deploy
  const webhookTest = await WebhookTest.deploy();
  await webhookTest.waitForDeployment();

  console.log("Contract deployed at:", await webhookTest.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});










// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying with:", deployer.address);

//   const balance = await deployer.getBalance();
//   console.log("Balance:", balance.toString());

//   const SetGet = await ethers.getContractFactory("SetGet");

//   const setGet = await SetGet.deploy();

//   await setGet.deployed();

//   console.log("SetGet deployed at:", setGet.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });




// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with account:", deployer.address);

//   // Deploy TestToken
//   const Token = await ethers.getContractFactory("WebhookTest2");
//   const token = await Token.deploy();  // deploy() is awaitable in v6
//   console.log("MyToken deployed to:", token.target);  // v6 uses .target instead of .address

//   // Deploy SimpleVault
//   const Vault = await ethers.getContractFactory("SimpleVault");
//   const vault = await Vault.deploy(token.target);
//   console.log("SimpleVault deployed to:", vault.target);

//   // Optional: approve vault to spend tokens
//   const amount = ethers.parseUnits("1000", 18);
//   await token.approve(vault.target, amount);
//   console.log(`Approved Vault to spend ${amount.toString()} TT`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
