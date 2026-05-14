// // import { ethers } from "hardhat";

// // async function main() {
// //   const [owner, user1] = await ethers.getSigners();

// //   const token = await ethers.getContractAt(
// //     "MyToken",
// //     "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// //   );

// //   const caller = await ethers.getContractAt(
// //     "TokenCaller",
// //     "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
// //   );

// //   console.log("Owner balance before:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
// //   console.log("User1 balance before:", ethers.utils.formatEther(await token.balanceOf(user1.address)));

// //   // Transfer tokens to TokenCaller first
// //   await token.transfer(caller.address, ethers.utils.parseEther("100"));
// //   console.log("Transferred 100 tokens from owner to TokenCaller");

// //   // Use TokenCaller to send 50 tokens to user1
// //   const callerAsOwner = caller.connect(owner);
// //   await callerAsOwner.transferToken(token.address, user1.address, ethers.utils.parseEther("50"));
// //   console.log("TokenCaller sent 50 tokens to User1");

// //   console.log("Owner balance after:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
// //   console.log("User1 balance after:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
// // }

// // main().catch((error) => {
// //   console.error(error);
// //   process.exit(1);
// // });


// // import { ethers } from "hardhat";

// // async function main() {

// //   const [owner, user1, user2, user3] = await ethers.getSigners();


// //   const token = await ethers.getContractAt("MyToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
// //   const caller = await ethers.getContractAt("TokenCaller", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

// //   console.log("Owner balance before:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
// //   console.log("User1 balance before:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
// //   console.log("User2 balance before:", ethers.utils.formatEther(await token.balanceOf(user2.address)));
// //   console.log("User3 balance before:", ethers.utils.formatEther(await token.balanceOf(user3.address)));

 
// //   await token.transfer(caller.address, ethers.utils.parseEther("200"));
// //   console.log("Owner transferred 200 tokens to TokenCaller");

// //   const callerAsOwner = caller.connect(owner);

// //   await callerAsOwner.transferToken(token.address, user1.address, ethers.utils.parseEther("50"));
// //   await callerAsOwner.transferToken(token.address, user2.address, ethers.utils.parseEther("70"));
// //   await callerAsOwner.transferToken(token.address, user3.address, ethers.utils.parseEther("30"));

// //   console.log("TokenCaller distributed tokens to users");

// //   console.log("Owner balance after:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
// //   console.log("User1 balance after:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
// //   console.log("User2 balance after:", ethers.utils.formatEther(await token.balanceOf(user2.address)));
// //   console.log("User3 balance after:", ethers.utils.formatEther(await token.balanceOf(user3.address)));
// // }

// // main().catch((error) => {
// //   console.error(error);
// //   process.exitCode = 1;
// // });


// import { ethers } from "hardhat";
// async function main() {
//   const [signer] = await ethers.getSigners();

//   const TOKEN_ADDRESS = "0x96d29cb8b012b05E65314d1051DD9a9edDB690F6";
//   const CALLER_ADDRESS = "0xc0c2B9e19E9A1F42467987B02B8972eDa80601c3";

//   const receiver = "0xd77dfa9529aea05161390c8e25d443ac3468d2a0";
//   const amount = ethers.utils.parseUnits("100", 18);

//   const tokenCaller = await ethers.getContractAt(
//     "TokenCaller",
//     CALLER_ADDRESS,
//     signer
//   );

//   const token = await ethers.getContractAt(
//     "MyToken",
//     TOKEN_ADDRESS,
//     signer
//   );

//   const before = await tokenCaller.getBalance(
//     TOKEN_ADDRESS,
//     signer.address
//   );
//   console.log("Balance before:", before.toString());


//   const approveTx = await token.approve(CALLER_ADDRESS, amount);
//   await approveTx.wait();
//   console.log("Approved:", amount.toString());


//   const allowance = await token.allowance(
//     signer.address,
//     CALLER_ADDRESS
//   );
//   console.log("Allowance:", allowance.toString());


//   const tx = await tokenCaller.transferToken(
//     TOKEN_ADDRESS,
//     receiver,
//     amount
//   );
//   await tx.wait();
//   console.log("Transfer successful");

//   const after = await tokenCaller.getBalance(
//     TOKEN_ADDRESS,
//     signer.address
//   );
//   console.log("Balance after:", after.toString());
// }

// main().catch((err) => {
//   console.error(err);
//   process.exitCode = 1;
// });




// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with account:", deployer.address);

//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.deploy();
//   console.log("MyToken deployed to:", token.target);

//   const Vault = await ethers.getContractFactory("SimpleVault");
//   const vault = await Vault.deploy(token.target);
//   console.log("SimpleVault deployed to:", vault.target);

//   const approveAmount = ethers.parseUnits("1000", 18); 
//   await token.approve(vault.target, approveAmount);
//   console.log(`Approved Vault to spend ${approveAmount.toString()} TT`);

//   const depositAmount = ethers.parseUnits("100", 18); 
//   const lockTime = Math.floor(Date.now() / 1000) + 10; 
//   await vault.deposit(depositAmount, lockTime);
//   console.log(`Deposited ${depositAmount.toString()} TT into Vault`);

//   console.log("Waiting for lock period to expire...");
//   await new Promise((resolve) => setTimeout(resolve, 12000));

//   const stake = await vault.getStake(deployer.address);
//   console.log("Stake info:", {
//     amount: stake.amount.toString(),
//     reward: stake.reward.toString(),
//   });

//   await vault.withdraw(deployer.address);
//   console.log("Withdrawn with rewards");

//   const balance = await token.balanceOf(deployer.address);
//   console.log("Token balance after withdraw:", balance.toString());
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });


// import { ethers } from "hardhat";

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with account:", deployer.address);

//   // Deploy Token
//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.deploy();
//   await token.deploymentTransaction()?.wait();
//   console.log("MyToken deployed to:", token.target);

//   // Deploy Vault
//   const Vault = await ethers.getContractFactory("SimpleVault");
//   const vault = await Vault.deploy(token.target);
//   await vault.deploymentTransaction()?.wait();
//   console.log("SimpleVault deployed to:", vault.target);

//   // Approve Vault
//   const approveAmount = ethers.parseUnits("1000", 18);
//   const approveTx = await token.approve(vault.target, approveAmount);
//   await approveTx.wait();
//   console.log(`Approved Vault to spend ${approveAmount.toString()} TT`);

//   // Deposit
//   const depositAmount = ethers.parseUnits("100", 18);
//   const lockTimeSeconds = 60; // Lock period: 60 seconds
//   const lockTime = Math.floor(Date.now() / 1000) + lockTimeSeconds;
//   const depositTx = await vault.deposit(depositAmount, lockTime);
//   await depositTx.wait();
//   console.log(`Deposited ${depositAmount.toString()} TT into Vault`);
//   console.log(`Lock period set to ${lockTimeSeconds} seconds from now`);

//   // Wait until lock expires
//   console.log("Waiting actual lock period on real network...");
//   const now = Math.floor(Date.now() / 1000);
//   const waitTime = lockTime - now;
//   if (waitTime > 0) {
//     console.log(`Sleeping for ${waitTime} seconds...`);
//     await new Promise((resolve) => setTimeout(resolve, (waitTime + 1) * 1000));
//   }

//   // Read stake info
//   const stake = await vault.getStake(deployer.address);
//   console.log("Stake info:", {
//     amount: stake.amount.toString(),
//     reward: stake.reward.toString(),
//   });

//   // Withdraw safely
//   try {
//     const vaultOwner = await vault.owner();
//     console.log("Vault owner:", vaultOwner);

//     const withdrawTx = await vault.withdraw(deployer.address, { gasLimit: 200_000 });
//     await withdrawTx.wait();
//     console.log("Withdrawn with rewards");
//   } catch (error: any) {
//     console.error("Withdraw failed:", error);
//   }

//   // Check final balance
//   const balance = await token.balanceOf(deployer.address);
//   console.log("Token balance after withdraw:", balance.toString());
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });



import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy MyToken
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("MyToken deployed to:", token.target);

  // Deploy SimpleVault
  const Vault = await ethers.getContractFactory("SimpleVault");
  const vault = await Vault.deploy(token.target);
  await vault.waitForDeployment();
  console.log("SimpleVault deployed to:", vault.target);

  // Approve Vault to spend tokens
  const approveAmount = ethers.parseUnits("1000", 18);
  const approveTx = await token.approve(vault.target, approveAmount);
  await approveTx.wait();
  console.log(`Approved Vault to spend ${approveAmount} TT`);

  // Deposit tokens dynamically
  const depositAmount = ethers.parseUnits("100", 18);
  const lockEndTime = Math.floor(Date.now() / 1000) + 3600; // Lock for 1 hour

  let depositFnName = "deposit";
  const fragmentNames = vault.interface.fragments.map((f) => f.name).filter(Boolean);
  if (!fragmentNames.includes("deposit")) {
    const candidates = fragmentNames.filter((n) => n?.toLowerCase().includes("deposit"));
    if (candidates.length) depositFnName = candidates[0];
    else throw new Error("No deposit function found in Vault ABI");
  }

  console.log(`Calling ${depositFnName}(${depositAmount}, ${lockEndTime})...`);
  const depositTx = await vault[depositFnName](depositAmount, lockEndTime);
  await depositTx.wait();
  console.log(`Deposited ${depositAmount} TT into Vault`);

  // Set lock period
  if (vault.setLockPeriod) {
    const lockTx = await vault.setLockPeriod(60);
    await lockTx.wait();
    console.log("Lock period set to 60 seconds from now");
  }

  // Sleep for lock period
  console.log("Sleeping for 61 seconds to let lock period expire...");
  await new Promise((resolve) => setTimeout(resolve, 61000));

  // Check stake info
  const stakeInfo = await vault.stakes(deployer.address);
  console.log("Stake info:", stakeInfo);

  // Log owner
  const owner = await vault.owner();
  console.log("Vault owner:", owner);

  // Withdraw dynamically
  try {
    let withdrawFnName = "withdraw";
    if (!fragmentNames.includes("withdraw")) {
      const candidates = fragmentNames.filter((n) => n?.toLowerCase().includes("withdraw"));
      if (candidates.length) withdrawFnName = candidates[0];
      else throw new Error("No withdraw function found in Vault ABI");
    }

    console.log(`Attempting to call ${withdrawFnName}(${deployer.address})...`);
    const withdrawTx = await vault[withdrawFnName](deployer.address);
    await withdrawTx.wait();
    console.log("Withdraw successful!");
  } catch (err) {
    console.error("Withdraw failed:", err);
  }

  // Check token balance after withdraw
  const balance = await token.balanceOf(deployer.address);
  console.log("Token balance after withdraw:", balance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
